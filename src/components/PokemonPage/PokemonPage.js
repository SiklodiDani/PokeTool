import { React, useState, useEffect } from "react";
import { useParams } from "react-router";
import {Link } from "react-router-dom";
import "./PokemonPage.css";

const PokemonPage = () => {
	const { id } = useParams();
	const [pokemon, setPokemon] = useState([]);
	const [evolution, setEvolution] = useState([]);
	const [cards, setCards] = useState([]);
	const [firstRender, setFirstRender] = useState(true);

	const fetchPokemon = async () => {
		//get information about the pokemon for the data displayed
		let res = await fetch(
			`https://pokeapi.co/api/v2/pokemon/${id}`
		);
		let data = await res.json();

		setPokemon(data);

		const getCards = async (data) => {
			setCards([]);

			//get information about the pokemon cards and populates the array with the url of the images
			res = await fetch(
				`https://api.pokemontcg.io/v2/cards?q=name:${data.name}&orderBy=name&sort=Asc`
			);
			data = await res.json();

			data.data.forEach((element) => {
				setCards((currentCard) => [...currentCard, element.images.small]);
			});
		};

		// getCards(data);

		const getEvolutionStage = async (data) => {

			//gets the url for the evolution link
			res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.name}/`);
			data = await res.json();
	
			//gets the data about the evolution stages
			let evolutionLink = data.evolution_chain.url;
			res = await fetch(evolutionLink);
			data = await res.json();

			if (firstRender) {
				let stage1Id = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${data.chain.species.name}`
				);
				let IdData = await stage1Id.json();
				let stageId = IdData.id;

				setEvolution((currentStage) => [...currentStage, stageId]);
				if (data.chain.evolves_to.length !== 0) {
					stage1Id = await fetch(
						`https://pokeapi.co/api/v2/pokemon/${data.chain.evolves_to[0].species.name}`
					);
					IdData = await stage1Id.json();

					setEvolution((currentStage) => [...currentStage, IdData.id]);
					if (data.chain.evolves_to[0].evolves_to.length !== 0) {
						stage1Id = await fetch(
							`https://pokeapi.co/api/v2/pokemon/${data.chain.evolves_to[0].evolves_to[0].species.name}`
						);
						IdData = await stage1Id.json();

						setEvolution((currentStage) => [...currentStage, IdData.id]);
					}
				}
				setFirstRender(false);
			}
		};

		getEvolutionStage(data);
        
	};

	useEffect(() => {
		fetchPokemon();
	}, [id]);

	return (
		<div className="page">
			{pokemon.length !== 0 && (
				<>
					<div className="pokemon">
						<div className="pokemon-img-container">
							<img
								src={`https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png`}
								alt={pokemon.name}
							/>
						</div>
						<div className="pokedex-data">
							<h2>Pokédex data</h2>
							<table>
								<tbody>
									<tr>
										<th>Entry</th>
										<td>{id}</td>
									</tr>
									<tr>
										<th>Type</th>
										<td>
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
										</td>
									</tr>
									<tr>
										<th>Height</th>
										<td>{pokemon.height}</td>
									</tr>
									<tr>
										<th>Weight</th>
										<td>{pokemon.weight}</td>
									</tr>
									<tr>
										<th>Abilities</th>
										<td>
											{pokemon.abilities.map((ability) => (
												<div>{ability.ability.name}</div>
											))}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div className="pokemon-stats">
							<h2>Base stats</h2>
							<table>
								<tbody>
									<tr>
										<th>Hp</th>
										<td>{pokemon.stats[0].base_stat}</td>
									</tr>
									<tr>
										<th>Attack</th>
										<td>{pokemon.stats[1].base_stat}</td>
									</tr>
									<tr>
										<th>Defense</th>
										<td>{pokemon.stats[2].base_stat}</td>
									</tr>
									<tr>
										<th>Speed</th>
										<td>{pokemon.stats[5].base_stat}</td>
									</tr>
									<tr>
										<th>Sp. Atk</th>
										<td>{pokemon.stats[3].base_stat}</td>
									</tr>
									<tr>
										<th>Sp. Def</th>
										<td>{pokemon.stats[4].base_stat}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<h2> Evolutions </h2>
					<div className="evolutions">
					{evolution.length > 0 &&
						evolution.map((stage) => (
							<div>
								<Link to={`/page/${stage}`}>
									<img
										src={`https://cdn.traction.one/pokedex/pokemon/${stage}.png`}
									/>
								</Link>
							</div>
						))}
						</div>
					{/* <div className="cards-container">
						{cards.map((card, i) => (
							<img src={card} key={i} alt={" "} />
						))}
					</div> */}
				</>
			)}
		</div>
	);
};

export default PokemonPage;
