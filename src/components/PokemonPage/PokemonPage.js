import { React, useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./PokemonPage.css";

const PokemonPage = () => {
	const { id } = useParams();
	const [pokemon, setPokemon] = useState([]);
	const [evolution, setEvolution] = useState([]);
	const [pokemonDescription, setPokemonDescription] = useState([]);
	const [cards, setCards] = useState([]);
	const [loading, setLoading] = useState(true);
	const [firstRender, setFirstRender] = useState(true);

	const fetchPokemon = async () => {
		//get information about the pokemon for the data displayed
		let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
		let data = await res.json();

		setPokemon(data);

		try {
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

				setLoading(false);
			};

			getCards(data);
		} catch (err) {
			console.log(err);
		}

		try {
			const getEvolutionStage = async (data) => {
				//gets the url for the evolution link
				res = await fetch(
					`https://pokeapi.co/api/v2/pokemon-species/${data.name}/`
				);
				data = await res.json();

				//populate an array with the description about this specific pokemon
				data.flavor_text_entries.forEach((text) => {
					if (text.language.name === "en") {
						setPokemonDescription(text.flavor_text);
					}
				});

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
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchPokemon();
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return (
		<div className="page">
			{pokemon.length !== 0 && (
				<>
					<h1>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h1>
					<div className="description">
						<p>{pokemonDescription.length !== 0 && pokemonDescription}</p>
					</div>
					<div className="pokemon-data">
						<div className="img-and-stats">
						<div className="pokemon-img-container">
							<img
								src={`https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png`}
								alt={pokemon.name}
							/>
						</div>
						<div className="pokedex-data">
							<h3>Pokédex data</h3>
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
											{pokemon.abilities.map((ability, i) => (
												<div key={i}>{ability.ability.name}</div>
											))}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div className="pokemon-stats">
							<h3>Base stats</h3>
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
						<div>
							<h3> Evolution stages </h3>
							<div className="evolutions">
								{evolution.length > 0 &&
									evolution.map((stage, i) => (
										<div key={i} className="stage-img">
											<Link to={`/page/${stage}`}>
												<img onClick={() => setLoading(true)}
													src={`https://cdn.traction.one/pokedex/pokemon/${stage}.png`}
													alt={stage}
												/>
											</Link>
										</div>
									))}
							</div>
						</div>
					</div>
					<div className="cards-container">
						{loading ? (
							<h3>loading...</h3>
						) : (
							cards.map((card, i) => <img src={card} key={i} alt={" "} />)
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default PokemonPage;
