export const WinMessage = ({ moves }) => {
    return (
        <div className="win-message">
            <h2>Congratulations!</h2>
            <p>You matched all the cards in {moves} moves!</p>
        </div>
    );
}
