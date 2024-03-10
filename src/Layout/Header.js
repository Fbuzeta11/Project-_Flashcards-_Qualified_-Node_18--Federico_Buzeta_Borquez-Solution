import React from "react";

function Header() {
  return (
    <header className="jumbotron bg-dark">
      <div className="logo-container"></div>
      <div className="container text-white">
        <h1 className="display-4">Flashcard Study App</h1>
        <p className="lead">by Federico Buzeta</p>
      </div>
    </header>
  );
}

export default Header;
