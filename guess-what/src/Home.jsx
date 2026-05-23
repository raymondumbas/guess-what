import { useState } from "react";
import { useAuth } from "./AuthContext";
import supabase from "./config/supabase-config";
import Login from "./Login";

function Home(){

    const { user } = useAuth();

    async function logout(e) {
        const { error } = await supabase.auth.signOut()

        if (error){
            console.log(error);
        }

        else{
            console.log("Log out Successful")
        }
    }

    // Logged In
    if (user){
        return(
            <>
                <button type = "button" onClick={logout} >Log Out</button>
            </>
        )
    }

    // Not Logged In
    else{
        return(
            <Login/>
        )
    }

}

export default Home