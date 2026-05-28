/*
    TO DO:
    - figure out how to increment the round number
    - implement re-render upon creating a new round
*/
function NewRound(props){

    const createRound = async () =>{
        const { data, error } = await supabase.from('games').insert([
          {
            id: crypto.randomUUID(),
            game_id: crypto.randomUUID(),
            round_num: inputs.name,
            options: inputs.options
          }
          
        ])

        if(error){
          console.log("error", error)
        }

        else{
          console.log("data", data)
        }    
    }

    return(
        <>
            New Round Button
        </>
    )
}

export default NewRound