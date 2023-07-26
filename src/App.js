import './App.css';
import LoginPage from './components/Login/loginPage';
import RegistrationPage from './components/Registration/registrationPage';
import TodoList from './components/Todo/TodoList';
import {Routes,Route} from 'react-router-dom'

import { Home } from './Pages/Home';
import { About } from './Pages/About';
import { Navbar } from './Pages/Navbar';

import { AuthProvider } from './Authentication/auth';
import { RequreAuth } from './Authentication/RequreAuth';



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
