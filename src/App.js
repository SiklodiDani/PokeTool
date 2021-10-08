import React, {useEffect, useState} from "react";
import './App.css';
import PokemonCard from "./components/PokemonCard";

function App() {
	const [allPokemon, setAllPokemon] = useState([]);
	const [loadMore, setLoadMore] = useState("https://pokeapi.co/api/v2/pokemon");

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
		<div className="App">
			<header className="App-header">
				<h1>PokeTools</h1>
				<div className="pokemon-container">
					{allPokemon.map((pokemon, index) => (
						<PokemonCard
							id={pokemon.id}
							name={pokemon.name}
							image={`https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png`}
              type={pokemon.type}
							key={index}
						/>
					))}
				</div>
				<button onClick={() => fetchPokemon()}>Load More</button>
			</header>
		</div>
	);
}

export default App;
