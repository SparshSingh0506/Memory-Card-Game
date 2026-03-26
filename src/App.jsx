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
  const [firstCard, setFirstCard] = useState(null);
  const [isBoardLocked, setIsBoardLocked] = useState(false);

  const initGame = () => {
    shuffleCards();
    const finalCards = createCardData();

    setCards(finalCards);
  }

  useEffect(() => initGame(), []);

  const handleCardClick = (clickedCard) => {
    if (clickedCard.isFlipped || isBoardLocked || (clickedCard.id === firstCard?.id)) return;

    setCards(currentCards => currentCards.map(card => (card.id === clickedCard.id) ? { ...card, isFlipped: true } : card));

    if (!firstCard) setFirstCard(clickedCard);

    else { // if its not the first card being clicked, apply matching logic
      if (firstCard.value === clickedCard.value) {
        const matchCards = () => {
          setCards(currentCards =>
            currentCards.map(card =>
              (card.id === firstCard.id || card.id === clickedCard.id) ? { ...card, isMatched: true } : card
            )
          )
        }
        
        setTimeout(matchCards, 300);
      }

      else {
        const resetCards = () => {
          setCards(currentCards =>
            currentCards.map(card =>
              (card.id === firstCard.id || card.id === clickedCard.id) ? { ...card, isFlipped: false } : card
            )
          )
        };

        setTimeout(resetCards, 800);
      }

      setFirstCard(null);
    }
  }

  return (
    <div className="app">
      <GameHeader score={3} moves={5} />

      <div className="cards-grid">
        {cards.map(card => <Card card={card} onClick={handleCardClick} />)}
      </div>
    </div>
  );
}

export default App
