import { GameHeader } from "../components/GameHeader";
import { cardValues } from "../data/cardValues";
import { Card } from "../components/Card";
import { useEffect, useState } from "react";

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const initGame = () => {
    // Shuffle logic

    const finalCards = cardValues.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(finalCards);
  }

  useEffect(() => { initGame(); }, []); // empty dependency array means this effect runs only once on mount

  const handleCardClick = (card) => {
    if (card.isFlipped || card.isMatched) return;

    const newCards = cards.map((thisCard) => (thisCard.id === card.id) ? {...thisCard, isFlipped: true} : thisCard)
    // using spread operator to keep all values same and only update isFlipped attribute for the passed card which was clicked
    // since its not enclosed under {}, its an implicit return

    setCards(newCards);

    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards); // Note - even when this is called to schedule the variable with a new value, the next lines reading the flippedCards variable will still use the old value until react re renders the segment

    if (flippedCards.length === 1) { // this will not run for the 1st flip as the flippedCards will still be []. On the 2nd flip, then this will run as the new state will have data from previous clicked card.
      // when this block runs, its when the 1st card is stored in the flippedCards and this function is being called for the 2nd card click
      const firstCard = cards[flippedCards[0]];

      if (firstCard.value === card.value) { // match if first clicked card's val matches the next passed card's val on next clicked
        setMatchedCards((prev) => [...prev, firstCard.id, card.id]); // can directly use functional state updation (using prev state)
      } 
      
      else {
        setTimeout(() => { // to not instantly flip the flipped cards after the second card is clicked
          const flippedBackCard = newCards.map((thisCard) => (newFlippedCards.includes(thisCard.id) || thisCard.id === card.id) ? {...thisCard, isFlipped: false}: thisCard); 
          // flip back both cards to front if cards did not match or if same card is pressed twice

          setCards(flippedBackCard);
          setFlippedCards([]);
        }, 800);
      }

    }
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
