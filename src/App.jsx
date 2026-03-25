import { GameHeader } from "../components/GameHeader";
import { cardValues } from "../data/cardValues";
import { Card } from "../components/Card";
import { useEffect, useState } from "react";

shuffleCards = () => {
  return;
}

createCardData = () => {
  return cardValues.map((value, index) => ({
    id: index,
    value,
    isFlipped: false,
    isMatched: false,
  }));
}

function App() {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  const initGame = () => {
    shuffleCards();
    const finalCards = createCardData();

    setCards(finalCards);
  }

  useEffect(() => initGame(), []);

  const handleCardClick = (clickedCard) => {
    
  }

  return (
    <div className = "app">
      <GameHeader score = {3} moves = {5}/>

      <div className = "cards-grid">
        {cards.map((card) => <Card card = {card} onClick = {handleCardClick}/>)}
      </div>
    </div>
  );
}

export default App
