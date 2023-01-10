import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import Home from './routes/Home';
import { Login } from './routes/Login';

function App() {
  let [user, setUser] = useState()
  const getUser = () => {
    fetch("http://localhost:4000/auth/login/", {
      method: "GET",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(resp => resp.status === 200 && resp.json())
      .catch(err => console.log(err, "request error!!"))
      .then(data => console.log(data))
      .catch(err => console.log(err, "response error!!"))
  }
  useEffect(() => {
    !user && getUser()
  }, [])
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />

      </Routes>
    </div>
  );
}

export default App;
