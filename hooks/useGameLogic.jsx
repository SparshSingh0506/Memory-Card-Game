import { cardValues } from "../data/cardValues";
import { useEffect, useState, useRef } from "react";

const shuffleCards = () => { //Fisher-Yates array shuffle algo
    const shuffledCards = [...cardValues];

    for (let i = shuffledCards.length - 1; i > 0; i--) {

        let j = Math.floor(Math.random() * (i + 1));

        [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }

    return shuffledCards;
}

const createCardData = (ShuffledCards) => {
    return ShuffledCards.map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
    }));
}

const clearTimeouts = (timeOutIdsRef) => {
    timeOutIdsRef.current.forEach(clearTimeout);
    timeOutIdsRef.current = [];
}

export const useGameLogic = () => {
    const [cards, setCards] = useState([]);
    const [firstCard, setFirstCard] = useState(null);
    const [isBoardLocked, setIsBoardLocked] = useState(false);

    const [score, setScore] = useState(0);
    const [moves, setMoves] = useState(0);

    const timeOutIdsRef = useRef([]);

    const initGame = (isQueryReset = false) => {
        if (isQueryReset) {
            clearTimeouts(timeOutIdsRef);

            setFirstCard(null);
            setIsBoardLocked(false);
            setScore(() => 0);
            setMoves(() => 0);
        }

        const finalCards = createCardData(shuffleCards());
        setCards(finalCards);
    }

    useEffect(() => { initGame() }, []);

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

            const timeOutId = setTimeout(matchCards, 300);
            timeOutIdsRef.current.push(timeOutId);
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

            const timeOutId = setTimeout(resetCards, 800);
            timeOutIdsRef.current.push(timeOutId);
        }
    }

    return {score, moves, initGame, cards, handleCardClick};
}
