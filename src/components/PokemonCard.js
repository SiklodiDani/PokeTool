import React from "react";
import "./PokemonCard.css";

const PokemonCard = ({ id, name, image, type }) => {
	return (
		<div className="pokemon">
			<div className="name">{name}</div>
			<div className="img-container">
				<img src={image} alt={name} />
			</div>
			<div className="id">
				<span>{id}</span>
			</div>
		</div>
	);
};

export default PokemonCard;
