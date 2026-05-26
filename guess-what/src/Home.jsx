import { useState } from "react";
import { useAuth } from "./AuthContext";
import supabase from "./config/supabase-config";
import Login from "./Login";
import GameList from "./GameList"
import { useNavigate } from "react-router-dom";

function Home(){

    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
        
    async function logout(e) {

        setLoading(true);

        const { error } = await supabase.auth.signOut()

        if (error){
            console.log(error);
            setLoading(false);
        }

        else{
            console.log("Log out Successful")
            navigate("/login");

        }
    }

    // Logged In
    if (user){
        return(
            <>
                You are logged in
                <button type = "button" onClick={logout} >{loading ? "Logging Out..." : "Log Out"}</button>
                <button type ="button" onClick={() => {navigate(`/newgame`)}}> New Game </button>

                <GameList/>
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