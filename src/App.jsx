import { GameHeader } from "../components/GameHeader";
import { cardValues } from "../data/cardValues";
import { Card } from "../components/Card";
import { useEffect, useState } from "react";

const shuffleCards = () => {
  return;
}

const createCardData = () => {
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

  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const initGame = () => {
      shuffleCards();
      const finalCards = createCardData();

      setCards(finalCards);
    }

    initGame(); 
  }, []);

  const handleCardClick = (clickedCard) => {
    if (clickedCard.isFlipped || isBoardLocked || (clickedCard.id === firstCard?.id)) return;

    setCards(currentCards => currentCards.map(card => (card.id === clickedCard.id) ? { ...card, isFlipped: true } : card));

    if (!firstCard) {
      setFirstCard(clickedCard);
      return;
    }

    setMoves(prev => prev + 1);
    setIsBoardLocked(true);

    const resetStates = () => {
      setFirstCard(null);
      setIsBoardLocked(false);
    }

    // if its not the first card clicked, apply matching logic
    if (firstCard.value === clickedCard.value) {
      const matchCards = () => {
        setCards(currentCards =>
          currentCards.map(card =>
            (card.id === firstCard.id || card.id === clickedCard.id) ? { ...card, isMatched: true } : card
          )
        );
        
        setScore(prev => prev + 1);
        resetStates();
      }
      
      setTimeout(matchCards, 300);
    }

    else {
      const resetCards = () => {
        setCards(currentCards =>
          currentCards.map(card =>
            (card.id === firstCard.id || card.id === clickedCard.id) ? { ...card, isFlipped: false } : card
          )
        );
        
        resetStates();
      }

      setTimeout(resetCards, 800);
    }
  }

  return (
    <div className="app">
      <GameHeader score={score} moves={moves} />

      <div className="cards-grid">
        {cards.map(card => <Card card={card} onClick={handleCardClick} />)}
      </div>
    </div>
  );
}

export default App
