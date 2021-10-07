import React, {useEffect, useState} from "react";
import './App.css';
import api from "./api/pokemon";

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

  // const fetchPokemon = async () => {
  //   const response = await fetch(loadMore);
  //   const data = await response.json();
    
  //   setLoadMore(response.next);
    
  //   function createPokemonCard (result) {
  //     result.forEach(async (pokemon) => {
  //       const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
  //       const data = await response.json();

  //       setPokemon(currentPokemon => [...currentPokemon, response])

  //       console.log(pokemon);
  //     })
  //   }
  //   createPokemonCard(response.results)
  // };

  // useEffect(() => {
	// 	fetchPokemon();
	// }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>PokeTools</h1>
        
      </header>
    </div>
  );
}

export default App;
