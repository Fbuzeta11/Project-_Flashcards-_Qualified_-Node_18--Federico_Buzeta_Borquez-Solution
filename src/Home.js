
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeckInfoCard from "./home/DeckInfoCard";
import { listDecks, deleteDeck } from "./utils/api/index";
import StructureInfoCard from "./home/DeckInfoCardStructure";

function Home() {
	const [decks, setDecks] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setDecks([]);
		const abortController = new AbortController();

		async function loadDecks() {
			try {
				let _decks = await listDecks(abortController.signal); 
				setDecks(_decks);
				setLoaded(true);
			} catch (error) {
				if (error.name === "AbortError") {
					console.info("Aborted");
				} else {
					throw error;
				}
			}
		}
		loadDecks(); 
		return () => {

			abortController.abort();
		};
	}, []);

	async function handleDeleteDeck(id) {
		//create a function called handleDeleteDeck that takes in an id as a parameter
		if (
			window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
		) {
			await deleteDeck(id); //await the result of deleteDeck and assign it to _decks
			setDecks(() => decks.filter((deck) => deck.id !== id)); //set the decks state to the result of the filter function
		}
	}

	const rows = decks.map((deck) => DeckInfoCard({ ...deck, handleDeleteDeck }));

	if (!loaded) {
		for (let i = 0; i < 3; i++) {
			rows.push(<StructureInfoCard key={i + 10} />); 
		}
	}
	return (
			<div className="row">
				<Link
					to="/decks/new"
					className="btn btn-secondary">
                  <i className="bi bi-plus-lg"></i> Create Deck
				</Link>
			<div className="row my-4"> {rows} </div>
     </div>
	);
}

export default Home;
