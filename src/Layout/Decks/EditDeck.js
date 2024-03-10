import React, { useEffect, useState } from "react";
import { Link, useHistory, useNavigate, useParams } from "react-router-dom";
import DeckForm from "./DeckForm";
import { readDeck, updateDeck } from "../../utils/api/index";

function EditDeck() {
  //const history = useHistory();
  const history = useNavigate();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});

  const name = deck.name ? deck.name : "Deck Name"; 

  useEffect(() => {
    const abortController = new AbortController(); 

    async function loadDeck() {
      try {
        const deckInfo = await readDeck(deckId, abortController.signal); 
        setDeck(deckInfo);
      } catch (error) {
        if (error.name === "AbortError") {
          console.info("aborted");
        } else {
          throw error;
        }
      }
    }

    loadDeck(); 

    return () => abortController.abort();
  }, [deckId]);

  function handleSubmit(deck) {
    const abortController = new AbortController(); 
    async function editDeck() {
      try {
        const deckInfo = await updateDeck(deck, abortController.signal); 
        history(`/decks/${deckInfo.id}`);
      } catch (err) {
        if (err.name === "AbortError") {
          console.info("aborted");
        } else {
          throw err; 
        }
      }
    }
    editDeck(); 

    return () => {
      abortController.abort();
    };
  }
  function handleCancel() {
    history(`/decks/${deckId}`);
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home"></span> Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <DeckForm
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        deck={deck}
      />
    </div>
  );
}

export default EditDeck;
