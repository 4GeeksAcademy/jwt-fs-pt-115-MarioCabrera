import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import {useState, useEffect } from "react";

export const DetailedStyleInfo = (props) => {
    const { store } = useGlobalReducer();
    const [race,setRace] = useState("human")
    
    useEffect(() => {
    const userRace = props.styleUsers?.find(user => {
        const character = store.characters.find(character => character.name === user.name);
        return character?.race;
    });

    if (userRace) {
        const character = store.characters.find(character => character.name === userRace.name);
        setRace(character?.race || "Human");
    }
}, [props.styleUsers, store.characters]);
    return (
        <div className="container my-4">
            <div className="row bg-white bg-opacity-75 rounded p-3 g-3">

                <div className="col-12 col-lg-6 text-center">
                    <img
                        src={props.img}
                        alt={props.name}
                        className="img-fluid rounded"
                        style={{ maxHeight: "450px", objectFit: "cover" }}
                    />
                </div>
                <div className="col-12 col-lg-6">
                    <h4 className="my-2">Name</h4>
                    <p className="fs-5">{props.name}</p>

                    <h4 className="my-2">Description</h4>
                    <p className="fs-5">{props.description}</p>

                    <h4 className="my-2">
                        {race === "Human" ? "Breathing Users" : "Blood Users"}
                    </h4>

                    <div className="d-flex overflow-auto flex-nowrap gap-3 py-2">
                        {props.styleUsers.map((element, index) => {
                            const techUser = store.characters.find(
                                (character) => character.name === element.name
                            );
                            return (
                                <div key={index} className="text-center">
                                    <Link to={`/detailedcharacter/${techUser.id}`}>
                                        <img
                                            src={techUser.img}
                                            alt={techUser.name}
                                            className="rounded"
                                            style={{ maxHeight: "150px", objectFit: "cover" }}
                                        />
                                    </Link>
                                    <p className="fs-6 mt-1">{techUser.name}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};