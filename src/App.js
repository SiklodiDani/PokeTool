import React from "react";
import PokemonList from "./components/PokemonList";
import PokemonCard from "./components/PokemonCard";
import PokemonPage from "./components/PokemonPage";
import './App.css';
import {Route, Switch} from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path="/"> <PokemonList /> </Route>
				<Route path="/page/:id"> <PokemonPage /> </Route>
			</Switch>
		</div>
	);
}

export default App;
