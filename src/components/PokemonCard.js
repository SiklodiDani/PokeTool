import React from "react";
import "./PokemonCard.css";


const PokemonCard = ({ id, name, image, types}) => {
	const colors = {
		normal: '#d1d1d1',
		water: '#cdeaff',
		grass: '#c7ffc5',
		fire: '#ffbfb4',
		fighting: '#b69180',
		flying: '#aec0e2',
		poison: '#bb9bc9',
		ground: '#ebe290',
		rock: 'rgb(172, 159, 106)',
		bug: 'rgb(193, 212, 123)',
		ghost: 'rgb(146, 136, 204)',
		electric: 'rgb(255, 255, 130)',
		psychic: '#d18ad4',
		ice: '#97fffa',
		dark: '#7a5e47',
		steel: '#c6d5df',
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
		<div className="pokemon"
			style={{
				backgroundImage: `linear-gradient(61deg, ${colors[style0]} 50%, ${colors[style1]} 50%)`
			}}>
			<div className="img-container">
				<img src={image} alt={name} />
			</div>
			<div className="info">
				<span className="id">#{id.toString().padStart(3,'0')}</span>
				<h3 className="name">{name}</h3>
				{types.map((type, i) => (
					<img
						src={`../typeIcons/${types[i].type.name}.png`}
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
	);
};

export default PokemonCard;
