import { useState } from "react";
import { login } from "../services/services";
import { useNavigate } from "react-router-dom";


export const Login = () => {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userData.email || !userData.password) {
            alert("Please fill in all fields.");
            return;
        }
        const token = await login(userData);
        if (token) {
            console.log("hello");
            
            navigate("/");
        }
    }
    return (
        <form action="submit" className="" onSubmit={handleSubmit}>
            <div className="row my-5 justify-content-between align-items-center  p-4 rounded">
                <img className="col-2" src="https://emoji.discadia.com/emojis/8c38a8f7-1c96-4fe6-be9c-530e9491b724.GIF" alt="" />
                <div className="col-md-6  d-flex flex-column align-items-center justify-content-center border rounded p-4 bg-secondary bg-opacity-10">
                    <div className="input-group mb-3">
                        <input onChange={handleChange} name="email" type="email" className="form-control" placeholder="E-mail" aria-label="E-mail" aria-describedby="basic-addon1" />
                    </div>
                    <div className="mb-3 input-group" >
                        <input onChange={handleChange} name="password" type="password" className="form-control" placeholder="Password" id="exampleInputPassword1" />
                    </div>

                    <button className="mt-2 btn btn-secondary border rounded" type="submit">Login</button>
                    <p> click <a href="/register">here</a> to register</p>
                </div>
                <img className="col-2" src="https://emoji.discadia.com/emojis/8c38a8f7-1c96-4fe6-be9c-530e9491b724.GIF" alt="" style={{ transform: "scaleX(-1)" }} />
            </div>
        </form>
    )
}