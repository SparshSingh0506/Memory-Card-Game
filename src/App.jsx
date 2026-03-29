import { GameHeader } from "../components/GameHeader";
import { Card } from "../components/Card";
import { WinMessage } from "../components/WinMessage";

import { useGameLogic } from "../hooks/useGameLogic";

function App() {
 const {score, moves, initGame, cards, handleCardClick} = useGameLogic();

  return (
    <div className="app">
      <GameHeader score={score} moves={moves} reset={initGame} />

      {score === 8 && <WinMessage moves={moves} />} 

      <div className="cards-grid">
        {cards.map(card => <Card card={card} onClick={handleCardClick} />)}
      </div>
    </div>
  );
}

export default App
