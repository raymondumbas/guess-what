import {useState} from 'react';
import DynamicListField from './DynamicListField';
import supabase from './config/supabase-config';
import { useNavigate } from 'react-router-dom';

// Form Code based on w3schools guide
function NewGameModal(){
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const { data, error } = await supabase.from('games').insert([
          {
            ID: crypto.randomUUID(),
            game_id: crypto.randomUUID(),
            name: inputs.name,
            options: inputs.options
          }
          
        ])

        if(error){
          console.log("error", error)
        }

        else{
          console.log("data", data)
          navigate(`/home`)
        }
        
        
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