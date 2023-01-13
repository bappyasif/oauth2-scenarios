import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function LoginSuccess() {
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch("http://localhost:4000/auth/secretPage",{
      method: "GET",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      }
    }).then((resp) => {
    console.log("request done")
    if(resp.status != 200) {
      return navigate("/login")
    }
    return resp.json();
  })
    .catch(err=>console.log('request error', err))
    .then((data)=>{
      console.log("response done", data)
    })
    .catch(err=>console.log('response error', err))
  }, [])

  return (
    <div>Login Successfull Validated With Jwt and Session Cookie</div>
  )
}

export default LoginSuccess