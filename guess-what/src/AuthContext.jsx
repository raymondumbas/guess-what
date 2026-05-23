import { createContext, useContext, useEffect, useState } from "react";
import supabase from './config/supabase-config';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  
  useEffect(() => {

        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user);
        });

    }, []);

    // Listen for login/logout
    const {
        data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {

    setUser(session?.user ?? null);

    });

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing the AuthContext
export const useAuth = () => useContext(AuthContext);
export default AuthProvider;