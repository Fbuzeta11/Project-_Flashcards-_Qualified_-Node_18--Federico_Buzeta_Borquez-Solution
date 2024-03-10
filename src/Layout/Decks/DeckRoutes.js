import React from "react";
import { Switch, Routes, useMatch, Router, Route } from "react-router-dom";
import NotFound from "../NotFound";
import DeckDetails from "./DeckDetails";
import EditDeck from "./EditDeck";
import AddCard from "../Cards/AddCard";
import EditCard from "../Cards/EditCard";
import StudyDeck from "./StudyDeck";

function DeckRoutes() {
  const { url } = useMatch();

  return (
    // <Router>
    <Routes>
      <Route path="/decks/:deckId" element={<DeckDetails />}></Route>
      <Route path="/decks/:deckId/study" element={<StudyDeck />}></Route>
      <Route path="/decks/:deckId/edit" element={<EditDeck />}></Route>
      <Route path="/decks/:deckId/cards/new" element={<AddCard />}></Route>
      <Route
        path="/decks/:deckId/cards/:cardId/edit"
        element={<EditCard />}
      ></Route>
      <Route path={url} element={<NotFound />}></Route>
    </Routes>
  );
}

export default DeckRoutes;
