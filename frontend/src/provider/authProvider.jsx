import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext();    // empty context object that will be used to share the authentication state and functions between components.


// This component serves as the provider for the authentication context.
// It receives children as a prop, which represents the child components that will have access to the authentication context.

const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
          axios.defaults.headers.common["Authorization"] = "Bearer " + `${token}`;
          localStorage.setItem('token', token);
        } else {
          delete axios.defaults.headers.common["Authorization"];
          localStorage.removeItem('token')
        }
    }, [token]);

    const contextValue = useMemo(() => {
        return {
            token: token,
            setToken: setToken
        }
    }, [token]);

    // Provide the authentication context to the children components

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
  
export default AuthProvider;


