import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import Home from './routes/Home';
import { Login } from './routes/Login';
import LoginSuccess from './routes/LoginSuccess';

function App() {
  let [user, setUser] = useState()
  const getUser = () => {
    fetch("http://localhost:4000/auth/login/success", {
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
      .then(data => setUser(data))
      .catch(err => console.log(err, "response error!!"))
  }
  useEffect(() => {
    !user && getUser()
  }, [])

  // useEffect(() => {
  //   fetch("http://localhost:4000/auth/secretPage",
  //     {
  //         method: "GET",
  //         credentials: 'include',
  //         headers: {
  //             "Authorization": `${localStorage.getItem("token")}`,
  //             "Accept": 'application/json',
  //             'Content-Type': 'application/json',
  //             "Access-Control-Allow-Credentials": true
  //         }
  //     }
  // ).then(() => console.log("request done"))
  //   .catch(err=>console.log('request error', err))
  //   .then(()=>console.log("response done"))
  //   .catch(err=>console.log('response error', err))
  // }, [user])

  console.log(user, "user!!")

  return (
    <div className="App">
      <Navbar user={user?.user} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/login/success' element={<LoginSuccess />} />
      </Routes>
    </div>
  );
}

export default App;
