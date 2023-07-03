import logo from './logo.svg';
import './App.css';
import LoginPage from './loginPage';
import RegistrationPage from './registrationPage';
import {Routes,Route} from 'react-router-dom'

import { Home } from './components/Home';
import { About } from './components/About';
import { Navbar } from './components/Navbar';

import { AuthProvider } from './components/auth';
import { RequreAuth } from './components/RequreAuth';
import TodoList from './TodoList';



  function App() {
  return (
   
      <>
      <AuthProvider>

      <Navbar/>

         <Routes>
           <Route path = '/' element ={<Home/>}></Route>
           <Route path = '/about' element ={<About/>}></Route>
           <Route path = '/registrationpage' element ={<RegistrationPage/>}></Route> 
           <Route path = '/login' element ={<LoginPage/>}></Route> 
           <Route path = '/todolist' element ={<RequreAuth><TodoList/></RequreAuth>}></Route>          
          
 
          </Routes>
        
      </AuthProvider> 
      
        
      </>
 
    
  ) 
}

export default App;
