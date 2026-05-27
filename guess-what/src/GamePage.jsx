import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import supabase from './config/supabase-config';
import JoinGame from './JoinGame';
import { useAuth } from './AuthContext';

/*
    State:
        games{
            gameID
        }
*/
function GamePage(){
    const {gameName} = useParams();
    const [game, setGame] = useState(null);
    const [playerRecords, setPlayerRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userInGame, setUserInGame] = useState(false);

    const {user} = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    const gameID = location.state.gameID;

    
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

    //Get User function
    async function getPlayerRecords(){

        const { data, error } = await supabase
                .from("player_records")
                .select("name, score")
                .eq("user_id", user.id)
                .eq("game_id", gameID)

        if(error){
            console.log(error);
        }
        else{
            if(data.length === 0){

                console.log(`No player records found for ${gameName}`)

            }

            else{

                setUserInGame(true);

            }
        }

    }

    useEffect(() => {

        getGameInfo();
        getPlayerRecords();

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

            <JoinGame userInGame = {userInGame} setUserInGame = {setUserInGame} gameID = {gameID} />
            
            {game && Object.entries(game.options).map(([optionID, option]) => (
                <div key={optionID}>
                    {option}
                </div>
            ))}
        </>
    )
}

export default GamePage