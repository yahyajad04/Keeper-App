import { createContext, useContext, useState, useEffect } from "react";
import getCurrentUser from "../api/auth";

const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function checkUser() {
            try{
                const currentUser = await getCurrentUser();
                setUser(currentUser);
            }catch(err){
                console.log(err.message)
            }finally{
                setLoading(false);
            }

        }

        checkUser();
    }, []);


    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    return useContext(AuthContext);
}