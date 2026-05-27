import { useEffect, useState } from "react"
import supabase from './config/supabase-config';
import { useNavigate } from "react-router-dom";
import JoinGame from "./JoinGame";

function GameList(){
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
   
    const goToGame = (game) =>{
        navigate(`/game/${game.name}`,{
            state:{
                gameID: game.game_id
            }
        })
    }

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
                console.log(games);
    }



    // Get Data
    useEffect( () => {

        getGames();
        
        
    }, []);

    // Populate page with elements for each game, only show game name
    
    if(loading){
        return <div>Loading Games...</div>
    }
    return(
        <>
            {games.map((game) => 
                (
            
                <div key = {game.game_id} onClick = {() => goToGame(game)}>
                    {game.name}
                </div>
                
            ))}
        </>
    )
}

export default GameList