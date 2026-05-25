import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import supabase from './config/supabase-config';
import { useNavigate } from "react-router-dom";

function GamePage(props){
    const {gameName} = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    async function getGameInfo(){

        const { data, error } = await supabase
                .from("games")
                .select("game_id, options")
                .eq("name", gameName)
                .single();

                if(error){

                   console.log(error);

                }

                else{

                    setGame(data);

                }

                setLoading(false);
    }

    useEffect(() => {

        getGameInfo();
        

    }, [])

    useEffect(() => {
        console.log(game);
    }, [game])

    if (loading){
        return (
            <>
                Loading Game... 
            </>
        )
    }

    return(game &&
        <>
            <button type = "button" onClick = {() => navigate(`/home`)}>Back</button>
            Game Name: {gameName}

            {game && Object.entries(game.options).map(([optionID, option]) => (
                <div key={optionID}>
                    {option}
                </div>
            ))}
        </>
    )
}

export default GamePage