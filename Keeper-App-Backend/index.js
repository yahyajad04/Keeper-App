import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import passport from "passport";
import session from "express-session";
import {Strategy} from "passport-local";
import cors from "cors";

const db = new pg.Client({
    user : "postgres",
    host: "localhost",
    database: "Keeper",
    password: "password123",
    port: 5432 
});
db.connect();

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.json());

app.use(session({
  secret : "THISISVERYSECRET",
  resave : false,
  saveUninitialized : true,
  cookie : {
   maxAge : 1000 *60*60 // this will make the cookie age to 1 hour
   }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/me", (req,res) => {
  if(req.isAuthenticated())
    res.status(200).json(req.user);
  else
    res.status(401).json({error: "You are Not Authenticated"});
})

app.post("/logout", (req, res) => {
    req.logout(function(err) {
        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        res.status(200).json({
            message: "Logged out"
        });
    });
});

app.post("/register", async (req,res) => {
    var body = req.body;
    try{
        var response = await db.query("SELECT email FROM users WHERE email=$1", [body.email]);
        if(response.rows.length > 0){
            res
            .status(400)
            .json({error: "This Email Already exist, try to login"});
        }else{
            bcrypt.hash(body.password, saltRounds, async (err, hash) => {
            if (err) {
            console.error("Error hashing password:", err);
            } else {
            console.log("Hashed Password:", hash);
            await db.query(
                "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
                [body.name, body.email, hash]
            );
            var user = {
                name : body.name,
                email: body.email
            }
            res
            .status(201)
            .json(user);
            }
        });
        }
    }catch(err){
        res
        .status(400)
        .json({error: err.stack});
    }
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {

    if (err) {
      console.log(err.stack);
      return res.status(500).json({ error: err });
    }

    if (!user) {
      console.log("Invalid email or password");
      return res.status(401).json({
        error: "Invalid email or password"
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.log(err.stack)
        return res.status(500).json({ error: err });
      }
      var newUser = {
        name: user.name,
        email: user.email
      }
      return res.status(200).json(newUser);
    });

  })(req, res, next);

});

app.get("/notes", async (req,res) => {
    if(req.isAuthenticated())
    {
        var response = await db.query("SELECT id,title,content from notes WHERE user_id=$1", [req.user.id]);
        var notes = response.rows;
        res
        .status(200)
        .json(notes);
    }else{
        res
        .status(401)
        .json({error : "You need to login to access this"});
    }
});

app.post("/notes", async(req,res) => {
    var body = req.body;
    if(req.isAuthenticated()){
        try{
            await db.query("INSERT INTO notes (title, content, user_id) VALUES ($1,$2, $3)", [body.title, body.content, req.user.id]);
            res.status(201).json(body);
        }catch(err){
            console.log(err.stack);
            res.status(400).json({error : err.message})
        }
    }else{
        res
        .status(401)
        .json({error: "You are not Authorized to do that"});
    }
});

app.get("/notes/:id", async (req,res) => {
  var id = req.params.id;
  if(req.isAuthenticated()){
    try{
      var response = await db.query("SELECT title,content FROM notes WHERE id=$1 AND user_id=$2",[id, req.user.id]);
      if(response.rows.length > 0){
        var data = response.rows[0];
        console.log(data);
        res.status(200).json({
          id: id,
          title: data.title,
          content: data.content
        });
      }else
        res.status(400).json({error : "This note is not Found in your notes"});
    }catch(err){
      res.status(400).json({error: err.message});
    }

  }else{
    res.status(401).json({error: "You are not Authorized to Edit this note"});
  }
});

app.post("/notes/:id", async (req,res) => {
  var body = req.body;
  var id = req.params.id;
  if(req.isAuthenticated()){
    try{
      await db.query("UPDATE notes SET title=$1,content=$2 WHERE id=$3 AND user_id=$4",[body.title, body.content, id, req.user.id]);
      res.status(200).json(body);
    }catch(err){
      res.status(400).json({error: err.message});
    }
  }else{
    res.status(401).json({error: "You are not Authorized to edit this note"});
  }
});

app.delete("/notes/:id", async (req,res) => {
  var id = req.params.id;
  if(req.isAuthenticated()){
    try{
      await db.query("DELETE FROM notes WHERE id=$1 AND user_id=$2", [id, req.user.id]);
      res.sendStatus(200);
    }catch(err){
      console.log(err.stack)
    }
  }else{
    res.status(401).json({error: "Unathorized to do this Action"});
  }
});
passport.use(
    new Strategy(   
    {
    usernameField: "email"
    },
async function verify(email, password, cb){
 try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedHashedPassword = user.password;
      bcrypt.compare(password, storedHashedPassword, (err, result) => {
        if (err) {
          return cb(err);
        } else {
          if (result) {
            return cb(null, user);
          } else {
            return cb(null, false);
          }
        }
      });
    } else {
      return cb("User not found");
    }
  } catch (err) {
    return cb(err);
  }
}));

passport.serializeUser((user,cb) => {
  return cb(null,user);
});

passport.deserializeUser((user,cb) => {
  return cb(null,user);
});

app.listen(port, () => {
    console.log("Server is listening on port 3000");
});


