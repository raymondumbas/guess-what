import { useState } from "react";
import { useAuth } from "./AuthContext";
import supabase from "./config/supabase-config";
import { useNavigate } from "react-router-dom";

function Login(props){

    const [inputs, setInputs] = useState({
        username:"",
        password:""
    });

    // "Sign In" or "Sign Up"
    const [action, setAction] = useState("Sign In");
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    async function handleSubmit(e){

        e.preventDefault();

        if (action == "Sign In"){

            const { data, error } = await supabase.auth.signInWithPassword({
                email: inputs.username + "@fakeemail.com",
                password: inputs.password
            });

            if (error) {
                console.log(error.message);
                return;
            }
            else{
                navigate("/home");
            }
            

        }

        else if(action == "Sign Up"){

            const { data, error } = await supabase.auth.signUp({
                email: inputs.username + "@fakeemail.com",
                password: inputs.password
            });

            if (error) {
                console.log("Error signing up:", error.message);
            } 
            
            else {
                navigate("/home");
            }

        }

    }

    const buttonName = action == "Sign In" ? "Switch to Create Account" : "Switch to Sign In";
    const switchAction = () =>{
        setAction(action == "Sign In" ? "Sign Up" : "Sign In")
    }


    return (
        <>  
            {action}

            <form onSubmit={handleSubmit}>

            <label>User Name:
            <input 
                type="text" 
                name="username" 
                value={inputs.username} 
                onChange={handleChange}
            />
            </label>

            <label>Password:
            <input 
                type="text" 
                name="password" 
                value={inputs.password} 
                onChange={handleChange}
            />
            </label>

            <input type="submit" value={action}/>
            </form>

            <button type="button" onClick = {switchAction} >{buttonName}</button>
        </>
        
    );
}

export default Login