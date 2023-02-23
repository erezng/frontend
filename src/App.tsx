import React, { useContext } from 'react';
// import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Navbar from './components/Navbar';
import { Route ,Routes} from 'react-router-dom';
import Home from './routes/Home';
import About from './routes/About';
import Login from './routes/Login';
import Register from './routes/Register';
import AuthContext from './context/AuthContext';

function App() {
  const {isLoggedIn} =useContext(AuthContext)
  return (
    <>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          {isLoggedIn&&<Route path="/about" element={<About/>}/>}
          {!isLoggedIn &&<Route path="/login" element={<Login/>}/>}
          {!isLoggedIn &&<Route path="/register" element={<Register/>}/>}
        </Routes>
    </>
    );
}

export default App;
