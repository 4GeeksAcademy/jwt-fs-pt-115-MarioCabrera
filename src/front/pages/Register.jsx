import { useState } from "react";
import { register } from "../services/services";


export const Register = () => {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        repeatPassword: ""
    });
    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userData.email || !userData.password || !userData.repeatPassword) {
            alert( userData.email + userData.password + userData.repeatPassword);
            return;
        }
        if (userData.password !== userData.repeatPassword) {
            alert("Passwords do not match.");
            return;
        }
        register(userData);
    }

    return (
        <form action="submit" onSubmit={handleSubmit} className="">
            <div className="row my-5 justify-content-between align-items-center  p-4 rounded">
                <img className="col-2" src="https://emoji.discadia.com/emojis/8c38a8f7-1c96-4fe6-be9c-530e9491b724.GIF" alt="" />
                <div className="col-md-6  d-flex flex-column align-items-center justify-content-center border rounded p-4 bg-secondary bg-opacity-10">
                    <div className="input-group mb-3">
                        <input onChange={handleChange} type="email" className="form-control" name="email" placeholder="E-mail" aria-label="E-mail" aria-describedby="basic-addon1" />
                    </div>
                    <div className="mb-3 input-group" >
                        <input onChange={handleChange} type="password" className="form-control" name="password" placeholder="Password" id="exampleInputPassword1"/>
                    </div>
                    <div className="mb-3 input-group" >
                        <input onChange={handleChange} type="password" className="form-control" name="repeatPassword" placeholder="Repeat Password" id="exampleInputPassword1"/>
                    </div>

                    <button className="mt-2 btn btn-secondary border rounded" type="submit">Register</button>
                </div>
                <img className="col-2" src="https://emoji.discadia.com/emojis/8c38a8f7-1c96-4fe6-be9c-530e9491b724.GIF" alt="" style={{ transform: "scaleX(-1)" }} />
            </div>
        </form>
    )
}