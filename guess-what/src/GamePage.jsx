import { useState, useEffect } from 'react';

import supabase from './config/supabase-config';


function GamePage(props){
   const [game, setGame] = useState(null);

    async function getGameInfo(){

        const { data, error } = await supabase
                .from("games")
                .select("game_id, options")
                .eq("name", props.gameName)
                .single();

                if(!error){

                   setGame(data);

                }
    }

    useEffect(() => {

        getGameInfo();
        

    }, [])

    useEffect(() => {
        console.log(game);
    }, [game])

    return(
        <>
            <button type = "button">Back</button>
            Game Name: {props.gameName}

            {game && Object.entries(game.options).map(([optionID, option]) => (
                <div key={optionID}>
                    {option}
                </div>
            ))}
        </>
    )
}

export default GamePage