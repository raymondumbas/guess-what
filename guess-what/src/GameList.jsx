import { useEffect, useState } from "react"
import supabase from './config/supabase-config';

function GameList(){
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getGames(){
            const { data, error } = await supabase
                .from("games")
                .select("name, game_id");

                if(error){

                    console.log(error)

                }

                else{

                    setGames(data);
                    
                }
                
                setLoading(false);
    }

    // Get Data
    useEffect( () => {

        getGames();
        console.log(games);
        
    }, []);

    // Populate page with elements for each game, only show game name
    
    if(loading){
        return <div>Loading Games...</div>
    }
    return(
        <>
            {games.map((game) => 
                (
            
                <div key = {game.game_id}>
                    {game.name}
                </div>
                
            ))}
        </>
    )
}

export default GameList