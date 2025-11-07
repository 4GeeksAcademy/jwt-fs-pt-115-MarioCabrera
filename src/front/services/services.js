import { Navigate } from "react-router-dom";

const BASEURL = import.meta.env.VITE_BACKEND_URL;

export const register = async (userData) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) {
    alert(data.msg);
    return;
  }
  alert("Usuario registrado correctamente");
}

export const login = async (userData) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) {
    alert(data.msg);
    return;
  }
  localStorage.setItem("token", data.token);
  alert("Usuario logueado correctamente");
  return data.token;
};

export const getPersonajes = async (dispatch) => {
  const response = await fetch(`${BASEURL}/api/characters`);
  if (!response.ok) {
    console.error("Error al obtener personajes");
    return;
  }

  const data = await response.json();
  dispatch({ type: "set_personajes", payload: data.content.content });
  
  
};
export const getStyles = async (dispatch) => {
   const response = await fetch(`${BASEURL}/api/combat-styles`);
   if (!response.ok) {
     console.log(response.error);
   }
   const data = await response.json();
   dispatch({ type: "set_styles", payload: data.content.content });
   console.log(data);
   
};
