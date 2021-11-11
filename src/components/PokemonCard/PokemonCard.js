import React from "react";
import {Link } from "react-router-dom";
import "./PokemonCard.css";
import "../PokemonPage/PokemonPage.js";


const PokemonCard = ({ id, name, image, types}) => {
	
	const colors = {
		normal: '#d1d1d1',
		water: '#81D4FA',
		grass: '#70d968',
		fire: '#f2bc5e',
		fighting: '#b69180',
		flying: '#9FA8DA',
		poison: '#b87ce6',
		ground: '#ebe290',
		rock: 'rgb(172, 159, 106)',
		bug: '#D4E157',
		ghost: 'rgb(146, 136, 204)',
		electric: '#FFEE58',
		psychic: '#d18ad4',
		ice: '#97fffa',
		dark: '#57586b',
		steel: '#c6d5df',
		dragon: '#cca6ff',
		fairy: 'rgb(253, 184, 255)'
	}

	let style0;
	let style1;	
	if(types.length > 1)
	{
		style0 = types[0].type.name;
		style1 = types[1].type.name;
	}else {
		style0 = style1 = types[0].type.name;
	}
	name = name[0].toUpperCase() + name.slice(1);

	return (
		<Link to={`/page/${id}`}>
			<span style={{ display: "block" }}>
				<div
					className="pokemon"
					style={{
						backgroundImage: `linear-gradient(61deg, ${colors[style0]} 49%, ${colors[style1]} 51%)`,
					}}
				>
					<div className="img-container">
						<img src={image} alt={name} />
					</div>
					<div className="info">
						<span className="id">#{id.toString().padStart(3, "0")}</span>
						<h3 className="name">{name}</h3>
						{types.map((type, i) => (
							<img
								src={`../typeIcons/${type.type.name}.png`}
								style={{
									width: "30px",
									height: "30px",
									borderRadius: "50%",
									margin: types.length > 1 ? "-2.5px" : "0",
								}}
								key={i}
								alt={types[i].type.name}
							/>
						))}
					</div>
				</div>
			</span>
		</Link>
	);
};

export default PokemonCard;
