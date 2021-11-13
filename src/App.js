import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import './App.css';
import Navbar from "./components/Navbar/Navbar.js"
import PokemonList from "./components/PokemonList/PokemonList";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import PokemonPage from "./components/PokemonPage/PokemonPage";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
			<Navbar />
			<Switch>
				<Route exact path="/"> <PokemonList /> </Route>
				<Route path="/page/:id"> <PokemonPage /> </Route>
			</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
