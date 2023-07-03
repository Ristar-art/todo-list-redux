import React from "react";
import {Link} from "react-router-dom"
import { useAuth } from "./auth";



export const Navbar =({user}) =>{

//this are links on the Navbaer to other pages
//access to the ristricted data by unaouthorised person will lead to being sent to the login page
 const auth = useAuth()
    
return(

    <nav>
        <Link to = '/'>Home </Link>
        <Link to = '/about'>About</Link>       
        <Link to = '/todolist'>To do list</Link> 
        <Link to = '/registrationpage'>Registration Page</Link>
          {
            !auth.authenticated &&( <Link to= 'login'>Login</Link>
            )
          }
         

    </nav>
   
)

}
