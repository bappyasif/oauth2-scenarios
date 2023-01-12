import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function LoginSuccess() {
  // let [getNewToken, setGetNewToken] = useState(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   getNewToken
  //   &&
  //   fetch("http://localhost:4000/auth/newToken",{
  //     method: "GET",
  //     credentials: "include",
  //     // "Access-Control-Allow-Origin": "http://localhost:4000",
  //     headers: {
  //       "Accept": "application/json",
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Credentials": true,
  //       // "Access-Control-Allow-Headers": "Accept",
  //       // "Access-Control-Allow-Origin": "http://localhost:4000"
  //     }
  //   }).then((resp) => {
  //   console.log("request done", resp.status)
  //   if(resp.status != 200) return navigate("/login")
  //   return resp.json();
  // })
  //   .catch(err=>console.log('request error', err))
  //   .then((data)=>{
  //     if(!data) {
  //       console.log("somethign wrong!!")
  //     }
  //     console.log("response done", data)
  //   })
  //   .catch(err=>console.log('response error', err))
  // }, [getNewToken])

  useEffect(() => {
    fetch("http://localhost:4000/auth/secretPage",{
      method: "GET",
      credentials: "include",
      // "Access-Control-Allow-Origin": "http://localhost:4000",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        // "Access-Control-Allow-Headers": "Accept",
        // "Access-Control-Allow-Origin": "http://localhost:4000"
      }
    }).then((resp) => {
    console.log("request done")
    if(resp.status != 200) {
      // setGetNewToken(true)
      // console.log("runing 1")
      return navigate("/login")
    }
    return resp.json();
  })
    .catch(err=>console.log('request error', err))
    .then((data)=>{
      // if(data === undefined) {
      //   console.log("runing 2")
      //   setGetNewToken(true)
      // }
      console.log("response done", data)
    })
    .catch(err=>console.log('response error', err))
  }, [])
  


  // console.log(user, "user!!")
  getNewToken && console.log(getNewToken, "getNewTojkenb")

  return (
    <div>Login Successfull Validated With Jwt and Session Cookie</div>
  )
}

export default LoginSuccess