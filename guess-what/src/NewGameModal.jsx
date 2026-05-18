import {useState} from 'react';

// Form Code based on w3schools guide
function NewGameModal(){
    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    function handleSubmit(e) {
        e.preventDefault();
        alert(Object.entries(inputs));
    }

  return (
    <form onSubmit={handleSubmit}>
      <label>First name:
      <input 
        type="text" 
        name="firstname" 
        value={inputs.firstname} 
        onChange={handleChange}
      />
      </label>
      <label>Last name:
        <input 
          type="text" 
          name="lastname" 
          value={inputs.lastname} 
          onChange={handleChange}
        />
      </label>
      <p>Current values: {inputs.firstname} {inputs.lastname}</p>

      <input type="submit" />
    </form>
  )
}

export default NewGameModal;