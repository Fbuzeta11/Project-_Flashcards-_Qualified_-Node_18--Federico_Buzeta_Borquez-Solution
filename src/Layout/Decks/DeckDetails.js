import React, { useState, useEffect, useCallback } from "react";
import {
  Link,
  useParams,
  useHistory,
  useNavigate,
  useMatch,
} from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../../utils/api";
import classNames from "../../utils/class-names";
import NotFound from "../NotFound";
import CardList from "../Cards/CardList";
import "../../data/db.json";

function DeckDetails() {
  console.log("In Deck Details");
  const [deckInfo, setDeckInfo] = useState({});
  const { deckId } = useParams();
  const { name, description } = deckInfo;
  // const { url } = useMatch();
  //const history = useHistory();
  const history = useNavigate();

  const navName = name ? name : "View Deck";

  const getDeckDetails = useCallback(async () => {
    try {
      const deck = await readDeck(deckId);
      setDeckInfo(deck);
    } catch (error) {
      setDeckInfo({ name: "Not Found" });
    }
  }, [deckId]);

  useEffect(() => {
    getDeckDetails();
  }, [deckId, getDeckDetails]);

  async function deleteHandler(id) {
    if (
      window.confirm("Delete this card?\n\nYou will not be able to recover it.")
    ) {
      await deleteCard(id);
      getDeckDetails();
    }
  }

  if (name === "Not Found") return <NotFound />;

  async function handleDeleteDeck() {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      await deleteDeck(deckId);
      history("/");
    }
  }

  //-------------------START RETURN-----------------
  return (
    <div>
      {/* These html elements and classes are the same as the other files.. comments for code is the same */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home"></span> Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {navName}
          </li>
        </ol>
      </nav>
      <h3 className={classNames({ "animated-bg animated-bg-text": !name })}>
        {name}
      </h3>
      <p className={classNames({ "animated-bg animated-bg-text": !name })}>
        {description}
      </p>
      <div className="deck-card-buttons">
        <Link
          className={classNames({
            btn: true,
            "btn-secondary": true,
            disabled: !name,
          })}
          // to={`${url}/edit`}
          to={`/decks/${deckId}/edit`}
        >
          <span className="oi oi-pencil"></span> Edit
        </Link>
        <Link
          className={classNames({
            btn: true,
            "btn-primary": true,
            disabled: !name,
          })}
          // to={`${url}/study`}
          to={`/decks/${deckId}/study`}
        >
          <span className="oi oi-book"></span> Study
        </Link>
        <Link
          className={classNames({
            btn: true,
            "btn-primary": true,
            disabled: !name,
          })}
          // to={`${url}/cards/new`}
          to={`/decks/${deckId}/cards/new`}
        >
          <span className="oi oi-plus"></span> Add Cards
        </Link>
        <button
          className="btn btn-danger delete-deck"
          onClick={handleDeleteDeck}
          disabled={!name}
        >
          <span className="oi oi-trash"></span>
        </button>
      </div>

      <CardList deck={deckInfo} deleteHandler={deleteHandler} />
    </div>
  );
}

export default DeckDetails;
