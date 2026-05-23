import { useState } from "react";
import { useAuth } from "./AuthContext";
import supabase from "./config/supabase-config";

function Login(props){

const [inputs, setInputs] = useState({});

const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
}

async function handleSubmit(e){

    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
        email: inputs.username + "@fakeemail.com",
        password: inputs.password
    });

    if (error) {
        console.log("Error signing up:", error.message);
    } 
    
    else {
        console.log("Account created!", data);

        // Check if user is logged in automatically
        if (data.session) {
            console.log("User is logged in!", data.session.user);
        } else {
            console.log("User may need email confirmation first.");
        }
    }
}
    return (
        <>  

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

            <input type="submit" value="Sign Up"/>
            </form>
        </>
        
    );
}

export default Login