export const Card = ({ card, onClick }) => { /*onClick is the function datatype being passed, here handleCardClick from App.jsx*/
    //css logic for card flipping
    return (
        <div className = {`card ${(card.isFlipped) ? "flipped" : "" }`}> 
            <div className = "card-front" onClick = {() => onClick(card)}>?</div> 
            {/*onClick calls the onClick function itself with the respective paramter, which is handCardClick(card)*/}
            <div className = "card-back">{card.value}</div>
        </div>
    );
}