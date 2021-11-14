import React, {useEffect, useState} from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import './PokemonList.css';

function PokemonList() {
	const [allPokemon, setAllPokemon] = useState([]);
	const [loadMore, setLoadMore] = useState("https://pokeapi.co/api/v2/pokemon?offset=0&limit=5");
	const [filter, setFilter] = useState("");

	const searchHandler = (e) => {
		setFilter(e.target.value);
	}
	
	
	const fetchPokemon = async () => {
		const res = await fetch(loadMore);
		const data = await res.json();
		setLoadMore(data.next);

		function createPokemonCard(result) {
			result.forEach(async (pokemon) => {
				const res = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
				);
				const data = await res.json();

				setAllPokemon((currentPokemon) => [...currentPokemon, data]);	
			});
		}
		createPokemonCard(data.results);
	};
	

	useEffect(() => {
		fetchPokemon();
	}, []);

	return (
		<div className="listBackground">
			<div className="search-bar">
				<input value={filter} onChange={searchHandler} type="text" placeholder="Search..."/>
			</div>
			<div className="pokemon-container">
				{allPokemon
					.sort((a, b) => (a.id > b.id ? 1 : -1))
					.map(
						(pokemon) =>
							pokemon.name.includes(filter) && 
							(
								<PokemonCard
									id={pokemon.id}
									name={pokemon.name}
									image={`https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png`}
									types={pokemon.types}
									key={pokemon.id}
								/>
							)
					)}
			</div>
			<div className="load-button" >
			<button onClick={() => fetchPokemon()}>Load More</button>
			</div>
		</div>
	);
}

export default PokemonList;