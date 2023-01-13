import React, { useState } from 'react'

export const Login = ({setUser}) => {
    const google = () => {
        window.open("http://localhost:4000/auth/google", "_self");
    };

    const github = () => {
        window.open("http://localhost:4000/auth/github", "_self");
    };

    const facebook = () => {
        window.open("http://localhost:4000/auth/facebook", "_self");
    };

    return (
        <div className="login">
            <h1 className="loginTitle">Choose a Login Method</h1>
            <div className="wrapper">
                <div className="left">
                    <div className="loginButton google" onClick={google}>
                        Google
                    </div>
                    <div className="loginButton facebook" onClick={facebook}>
                        Facebook
                    </div>
                    <div className="loginButton github" onClick={github}>
                        Github
                    </div>
                </div>
                <div className="center">
                    <div className="line" />
                    <div className="or">OR</div>
                </div>
                <div className="right">
                    <UserLogin setUser={setUser} />
                    {/* <input type="text" placeholder="Username" />
                    <input type="text" placeholder="Password" />
                    <button className="submit" onClick={handleLogin}>Login</button> */}
                </div>
            </div>
        </div>
    );
};

const UserLogin = ({setUser}) => {
    // const [user, setUser] = useState({})
    const [formData, setFormData] = useState({})

    const handleFormDataChange = (evt, el) => setFormData(prev => ({ ...prev, [el]: evt.target.value }))

    const sendLoginRequest = () => {
        const url = 'http:///localhost:4000/ep-auth/login';
        fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                "Accept": "Application/json",
                "content-Type": "Application/json"
            },
            body: JSON.stringify(formData)
        }).then(resp => resp.json())
            .catch(err => console.log("response error!!", err))
            .then(data => {
                console.log(data)
                setUser(data);
            })
            .catch(err => console.log("data error", err))
    }

    const handleLogin = (evt) => {
        evt.preventDefault();
        if (formData.email && formData.password) {
            sendLoginRequest()
        } else {
            alert("enter your registered email and password")
        }
    }

    return (
        <form method='post' onSubmit={handleLogin}>
            <input type="emnail" placeholder="User email" required onChange={e=>handleFormDataChange(e, "email")} />
            <input type="password" placeholder="Password" required onChange={e=>handleFormDataChange(e, "password")} />
            <button className="submit" type='submit'>Login</button>
        </form>
    )
}