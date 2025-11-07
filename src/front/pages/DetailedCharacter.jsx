// Import necessary components from react-router-dom and other parts of the application.
import { useParams } from "react-router-dom";
import { DetailedCharacterInfo } from "../components/DetailedCharacter";
import useGlobalReducer from "../hooks/useGlobalReducer"; 

export const DetailedCharacter = () => {
  const { store, dispatch } = useGlobalReducer();
  const { id } = useParams();

  // Si todavía no hay personajes, no busques nada
  if (!store.characters || store.characters.length === 0) {
    return (
    <div className="details-page">
      <div className="d-flex justify-content-end">
        Cargando Personaje...
      </div>
    </div>
    )
  }

  const selectedInfo = store.characters.find(character => character.id === parseInt(id));

  // Si no encontró el personaje (o aún no cargó)
  if (!selectedInfo) {
    return (
    <div className="details-page">
      <div className="d-flex justify-content-end">
        Cargando Personaje...
      </div>
    </div>
    )
  }

  const usedStyles = store.styles?.filter(style =>
    style.combat_style_character?.some(
      character => character.name === selectedInfo.name
    )
    
  ) || [];

  return (
    <div className="details-page">
      <div className="d-flex justify-content-end">
        <DetailedCharacterInfo
          name={selectedInfo.name}
          age={selectedInfo.age}
          gender={selectedInfo.gender}
          description={selectedInfo.description}
          img={selectedInfo.img}
          quote={selectedInfo.quote}
          styles={usedStyles}
          race={selectedInfo.race}
        />
      </div>
    </div>
  );
};