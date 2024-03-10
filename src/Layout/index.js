import React from "react";
import Header from "../Layout/Header";
import Home from "../Home.js";
import CreateDeck from "./Decks/CreateDeck";
import DeckRoutes from "./Decks/DeckRoutes";
import NotFound from "./NotFound";
import { Switch, Route, Routes, Router } from "react-router-dom";
import "./index.css";
import DeckDetails from "./Decks/DeckDetails";
import EditCard from "./Cards/EditCard";
import StudyDeck from "./Decks/StudyDeck";
import EditDeck from "./Decks/EditDeck";
import AddCard from "./Cards/AddCard";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/decks/new" element={<CreateDeck />}></Route>
          {/* <Route path="/decks/:deckId" element={<DeckRoutes />}></Route> */}
          {/* <Route path="/" element={<NotFound />}></Route> */}
          <Route path="/decks/:deckId" element={<DeckDetails />}></Route>
          <Route path="/decks/:deckId/study" element={<StudyDeck />}></Route>
          <Route path="/decks/:deckId/edit" element={<EditDeck />}></Route>
          <Route path="/decks/:deckId/cards/new" element={<AddCard />}></Route>
          <Route
            path="/decks/:deckId/cards/:cardId/edit"
            element={<EditCard />}
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default Layout;
