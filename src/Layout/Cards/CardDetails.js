import React from "react";
import { Link } from "react-router-dom";

function CardDetails({ id, front, back, deckId, deleteHandler }) {
  return (
    <div className="card my-1" key={id}>
      <div className="card-body">
        <div className="card-content">
          <p className="card-text mx-2">{front}</p>
          <p className="card-text mx-2">{back}</p>
        </div>
        <div className="card-buttons">
          <Link
            className="btn btn-secondary"
            to={`/decks/${deckId}/cards/${id}/edit`}
          >
            <span className="oi oi-pencil"></span> Edit
          </Link>
          <button
            className="btn btn-danger delete-deck"
            onClick={() => deleteHandler(id)}
          >
            <span className="oi oi-trash"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardDetails;
