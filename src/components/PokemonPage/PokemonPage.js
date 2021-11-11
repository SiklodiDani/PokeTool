import { React, useState, useEffect } from "react";
import { useParams } from "react-router";
import "./PokemonPage.css";

const PokemonPage = () => {
	const { id } = useParams();
	const [pokemon, setPokemon] = useState([]);
	const [cards, setCards] = useState([]);

	const fetchPokemon = async () => {
		let res = await fetch(
			`https://pokeapi.co/api/v2/pokemon/${id}?orderBy=name`
		);
		let data = await res.json();

		setPokemon(data);

		res = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${data.name}`);
		data = await res.json();

		data.data.forEach((element) => {
			setCards((currentCard) => [...currentCard, element.images.small]);
		});
	};

	useEffect(() => {
		fetchPokemon();
	}, []);

	return (
		<div className="page">
			{pokemon.length !== 0 && (
				<>
					<div className="pokemon-data">
						<div >
							<div className="pokemon-img-container">
								<img
									src={`https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png`}
									alt={pokemon.name}
								/>
							</div>
							<div className="info">
								<span className="id">#{id.toString().padStart(3, "0")}</span>
								<h3 className="name">
									{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
								</h3>
								{pokemon.types.map((type, i) => (
									<img
										src={`../typeIcons/${type.type.name}.png`}
										style={{
											width: "30px",
											height: "30px",
											borderRadius: "50%",
											margin: pokemon.types.length > 1 ? "-2.5px" : "0",
										}}
										key={i}
										alt={type.type.name}
									/>
								))}
							</div>
						</div>
						<div className="stats-container">
							<div className="stats-row">
								<span>Hp: {pokemon.stats[0].base_stat}</span>
								<span>Atk: {pokemon.stats[1].base_stat}</span>
							</div>
							<div className="stats-row">
								<span>Def: {pokemon.stats[2].base_stat}</span>
								<span>Sp: {pokemon.stats[5].base_stat}</span>
							</div>
							<div className="stats-row">
								<div>Special-Atk: {pokemon.stats[3].base_stat}</div>
								<div>Special-Def: {pokemon.stats[4].base_stat}</div>
							</div>
						</div>
					</div>
					<div className="cards-container">
						{cards.map((card, i) => (
							<img src={card} key={i} alt={" "} />
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default PokemonPage;
