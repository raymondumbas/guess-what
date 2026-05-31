import { useEffect } from "react";
import { getData, updateData, insertData } from "./util/functions";

// Props: gameID
function NewRoundButton(props){

    const newRound = async () => {

        console.log("HERE 0")

        const current_data= await getData("games", "current_round",{
            field: "game_id",
            value: props.gameID,
        });

        const round_num = current_data[0].current_round;

        console.log("HERE 1")

        await updateData("games", {"current_round": round_num + 1}, {
            field: "game_id",
            value: props.gameID,
        })

        console.log("HERE 2 ")

        await insertData("rounds", {
            id: crypto.randomUUID,
            game_id: props.gameID,
            round_num: round_num + 1,
            correct_option: null
        })

        console.log("HERE 3")

    }
    return(
        <>
            <button type = "button" onClick = {() => newRound()}> + New Round</button>
        </>
    )
}

export default NewRoundButton;