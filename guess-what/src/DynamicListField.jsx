import {useState} from 'react';
import { useEffect } from 'react';

/*
    Props
    - setInputs: state setter from parent form
*/

function DynamicListField(props){

    //Initialize options with one default empty option
    const [options, setOptions] = useState({});

    // Update existing option
    const handleOptionsChange = (e) => {

        const id = e.target.id;
        const value = e.target.value;
        setOptions(values => ({...values, [id]: value}))
        
    }

    // Create new option
    const newOption = (e) => {

        const newID = crypto.randomUUID();

        setOptions(values => ({...values, [newID]: ""}))

    }


    // Delete an option from options state
    const deleteOption = (id) => {

        const updatedOptions = {...options}
        delete updatedOptions[id];
        setOptions (updatedOptions)

    }

    // Update parent form state when options change
    useEffect( () => {

        props.setInputs(values => ({...values, ["options"]: options }))

    }, [options]);

    return(
        <>
            {/*New option button*/}
            <button type = "button" onClick={newOption} > + </button>    

            {/*Render current options*/}  
            {Object.entries(options).map(([id,value]) => 
                (
                <>
                    <input 
                        key = {id}
                        id = {id}
                        value = {value} 
                        onChange={handleOptionsChange} 
                    />
                    <button 
                        type="button" 
                        onClick={() => deleteOption(id)}
                    >
                        X
                    </button>
                </>
            ))}

        </>
    )

}

export default DynamicListField;