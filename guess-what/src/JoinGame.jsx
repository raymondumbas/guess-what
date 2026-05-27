import { useState, useEffect } from "react"
import supabase from './config/supabase-config';
import { useAuth } from './AuthContext';

/*
    Props
    - userInGame
    - setUserInGame
    - gameID
*/
function JoinGame(props){
    const {user} = useAuth();
    let userData;

    //Join function
    const joinGame = async () =>{
        const { data, error } = await supabase.from('player_records').insert([
            {
                id: crypto.randomUUID(),
                user_id: user.id,
                game_id: props.gameID,
                name: "TODO",
                score: 0,
            }
        ])

        if (error){

            console.log(error);

        }
        else{

            console.log("Join Successful");
            props.setUserInGame(true);

        }
    }

    if(props.userInGame){
        return(
            <>
                Already in Game
            </>
        )
    }

    else{
        return(
            <>
                <button type = "button" onClick = {() => joinGame()}>Join</button>
            </>
        )
    }

}

export default JoinGame