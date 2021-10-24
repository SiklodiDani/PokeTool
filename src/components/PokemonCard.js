import React from "react";
import "./PokemonCard.css";


const PokemonCard = ({ id, name, image, types, type1 }) => {
	const style = `pokemon ${type1}`;
	name = name[0].toUpperCase() + name.slice(1);
	return (
		<div className={style}>
			<div className="img-container">
				<img src={image} alt={name} />
			</div>
			<div className="info">
				<span className="id">#{id}</span>
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
