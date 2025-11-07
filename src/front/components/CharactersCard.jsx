import { Link } from "react-router-dom";
import "../styles/styles.css"
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
export const CharactersCard = (props) => {
    const [favorite,setFavorite] = useState(false)
    const {store,dispatch} = useGlobalReducer()
    const addFavorite = (data) => {
        setFavorite(prev => !prev)
        dispatch({type:'add_favorite',payload:data})
    }
    const checkFavorite = () => {
        const check = store.favorites.find(element => element === props.name)
        if(check){
            setFavorite(true)
            return
        }
        setFavorite(false)
    }
    const removeFavorite = (data) => {
        setFavorite(prev => !prev)
        dispatch({type:'remove_favorite',payload:data})        
    }
    useEffect(() => {   
        checkFavorite()
    },[store.favorites])
    return (
        <div className="bg-white card text-center h-100 flex-shrink-0 bg-opacity-25" style={{ minWidth: "200px" }}>
            <img
                className="card-img-top mx-auto mt-3 rounded"
                src={props.image}
                alt={props.name}
                style={{ height: "200px", objectFit: "contain", maxWidth: "100%" }}
            />
            <div className="card-body fw-bold fs-5 card-name">{props.name}</div>
            <div>
                <Link to={`/${props.type}/${props.id}`}><button className="btn btn-info mx-2 my-1 fw-bold">Mas informacion</button></Link>
                {!localStorage.getItem("token") ? <Link to={"/login"} className="btn btn-warning mx-2 my-1"><i className="fa-regular fa-heart"></i></Link> : !favorite ? <button className="btn btn-warning mx-2 my-1" onClick={()=>{addFavorite(props.name)}}><i className="fa-regular fa-heart"></i></button>: <button className="btn btn-warning mx-2 my-1" onClick={()=>{removeFavorite(props.name)}}><i className="fa-solid fa-heart"></i></button>}
            </div>
        </div>
    );
};