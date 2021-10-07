import React, {useEffect, useState} from "react";
import './App.css';
import api from "./api/pokemon";
import PokemonCard from "./components/PokemonCard";

function App() {

  const [allPokemon, setAllPokemon] = useState([]);
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon');

  const fetchPokemon = async () => {
    const response = await api.get("/pokemon");
    
    setLoadMore(response.data.next);
    
    function createPokemonCard (result) {
      result.forEach(async (pokemon) => {
        const response = await api.get(`/pokemon/${pokemon.name}`);

        setAllPokemon(currentPokemon => [...currentPokemon, response.data]);
      })
    }
    createPokemonCard(response.data.results);
    
  };

  useEffect(() => {
		fetchPokemon();
	}, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>PokeTools</h1>
          <div>
            {allPokemon.map((pokemon, index) => 
            <PokemonCard
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.sprites.front_default}
            key={index}
             />)}
          </div>
      </header>
    </div>
  );
}

export default App;
