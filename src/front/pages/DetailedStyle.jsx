// Import necessary components from react-router-dom and other parts of the application.
import { Link, useParams } from "react-router-dom";
import { DetailedStyleInfo } from "../components/DetailedStyle";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.

export const DetailedStyle = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()
  const { id } = useParams()
  const selectedInfo = store.styles.find(character => character.id === parseInt(id))
  
   
  
  return (
    <div className="details-page">
      <div className="d-flex justify-content-end">
        <DetailedStyleInfo
          name = {selectedInfo.name}
          description = {selectedInfo.description}
          img = {selectedInfo.img}
          quote = {selectedInfo.quote}
          race = {selectedInfo.race}
          styleUsers = {selectedInfo.combat_style_character}
        />
      </div>
    </div>
  );
};
