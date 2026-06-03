import { useState, useEffect } from "react";
import { getData } from "./util/functions";

function RoundList(props){

    const [roundList, setRoundList] = useState([]);

    const getRounds = async () =>{

       const rounds = await getData("rounds", "round_num, correct_option", {
            field: "game_id",
            value: props.gameID,
        } )

        setRoundList(rounds);

    }

    useEffect(() =>{

        getRounds();
        
    },[])

   
    return(roundList &&
        <>
            {roundList.map(round => (
                <div key={round.round_num}>
                    {round.round_num}
                    {round.correct_option ? "Option selected" : "No correct option"}
                </div>
            ))}
        </>
    )
}

export default RoundList;