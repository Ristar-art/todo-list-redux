import { Children } from "react";
import { useState,useContext,createContext } from "react";


const AutheContext = createContext(null);

 export const AuthProvider = ({children})=>{

    const [authenticated, setAuthenticated] = useState(null);

    const login = (authenticated) =>{

        setAuthenticated(authenticated)
    } 


     const logout = ()=>{
        setAuthenticated()
    }

    return(
        <AutheContext.Provider value ={{authenticated,login,logout}}>{children}</AutheContext.Provider>
    )
}
export const useAuth = () =>{
    return useContext(AutheContext);
}
