import {useState} from 'react';
import DynamicListField from './DynamicListField';
import supabase from './config/supabase-config';

// Form Code based on w3schools guide
function NewGameModal(){
    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    async function handleSubmit(e) {
        e.preventDefault();

        console.log("HERE")
        const { data, error } = await supabase.from('games').insert([
          {
            ID: crypto.randomUUID(),
            game_id: crypto.randomUUID(),
            name: inputs.name,
            options: inputs.options
          }
          
        ])

        console.log("data", data)
        console.log("error", error)
    }

  return (
    <form onSubmit={handleSubmit}>

      <label>Game Name:
      <input 
        type="text" 
        name="name" 
        value={inputs.name} 
        onChange={handleChange}
      />
      </label>

      <DynamicListField setInputs = {setInputs} />

      <input type="submit" value="create"/>
    </form>
  )
}

export default NewGameModal;