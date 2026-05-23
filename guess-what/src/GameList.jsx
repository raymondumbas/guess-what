import { useEffect, useState } from "react"
import supabase from './config/supabase-config';

function GameList(){
    const [games, setGames] = useState([]);

    async function getGames(){
            const { data, error } = await supabase
                .from("games")
                .select("name","game_id");

                if(!error){

                    setGames(data);

                }
    }

    // Get Data
    useEffect( () => {

        getGames();
        console.log(games);
        
    }, []);

    // Populate page with elements for each game, only show game name
    
    return(
        <>
            {games.map((game) => 
                (
                <>
                    <div key = {game.name}>
                        {game.name}
                    </div>
                </>
            ))}
        </>
    )
}

export default GameList