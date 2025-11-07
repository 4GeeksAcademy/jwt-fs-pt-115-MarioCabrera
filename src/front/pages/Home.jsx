import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { element } from "prop-types";
import { CharactersCard } from "../components/CharactersCard.jsx";
import { useEffect, useState } from "react";
import "../styles/styles.css"

export const Home = () => {
	const [hunters, setHunters] = useState([])
	const [demons, setDemons] = useState([])
	const [availableStyles, setAvailableStyles] = useState([])
	const { store, dispatch } = useGlobalReducer()
	
	useEffect(() => {
		if (store.characters.length > 0) {
			setHunters(store.characters.filter(character => character.race === "Human"));
			
			setDemons(store.characters.filter(character => character.race === "Demon"));
		}
		if (store.styles.length > 0) {
			setAvailableStyles(store.styles.filter(styles => styles.img !== ""))
		}
	}, [store.characters]);
	return (

		<div className="home-page">
			<div className="container ">
				<h3 className="fw-bold pt-4 text-white title">Cazadores</h3>
				<div className="d-flex overflow-x-auto flex-nowrap gap-2">
					{hunters.map((element, index) => (
						<CharactersCard
							key={index}
							name={element.name}
							image={element.img}
							id={element.id}
							type="detailedcharacter"
						/>
					))}
				</div>
				<h3 className="fw-bold mt-4 text-white title">Demonios</h3>
				<div className="d-flex overflow-x-auto flex-nowrap gap-2">
					{demons.map((element, index) => (
						<CharactersCard
							key={index}
							name={element.name}
							image={element.img}
							id={element.id}
							type="detailedcharacter"
						/>
					))}
				</div>
				<h3 className="fw-bold mt-4 text-white title">Estilos de combate</h3>
				<div className="d-flex overflow-x-auto flex-nowrap gap-2">
					{availableStyles.map((element, index) => (
						<CharactersCard
							key={index}
							name={element.name}
							image={element.img}
							id={element.id}
							type="detailedstyle"
						/>
					))}
				</div>
			</div>
		</div>
	);
}; 