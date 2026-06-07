import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import supabase from './config/supabase-config';
import JoinGame from './JoinGame';
import { useAuth } from './AuthContext';
import NewRoundButton from './NewRoundButton';
import RoundList from './RoundList';

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

        // Get all player records for this game
        const { data, error } = await supabase
                .from("player_records")
                .select("name, score")
                .eq("game_id", gameID)

        if(error){
            console.log(error);
        }

        // Get successful
        else{

            // If empty, then user is not in this game
            if(data.length === 0){

                console.log(`No player records found for ${gameName}`)

            }

            // Player records exist
            else{

                // Check if current user is in game
                if(data.some(player => player.id === user.id)){
                    setUserInGame(true);
                }

                setPlayerRecords(data);
                
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

    return(game && playerRecords &&
        <>
            <button type = "button" onClick = {() => navigate(`/home`)}>Back</button>
            Game Name: {gameName}

            <JoinGame userInGame = {userInGame} setUserInGame = {setUserInGame} gameID = {gameID} />
            <NewRoundButton gameID = {gameID}/>
            <RoundList gameID = {gameID} />

            {
                playerRecords.map(player =>{
                    <div key = {player.id}>
                        {player}
                    </div>

                })
            }

            {
                Object.entries(game.options).map(([optionID, option]) => (
                    <div key={optionID}>
                        {option}
                    </div>
                ))
            }
        </>
    )
}

export default GamePage