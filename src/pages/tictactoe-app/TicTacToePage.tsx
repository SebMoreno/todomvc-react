import { useEffect, useState } from "react";
import { Button } from "../../elements/Button.tsx";
import { Board } from "../../pages/tictactoe-app/Board.tsx";
import { History } from "../../pages/tictactoe-app/History.tsx";
import { calculateWinner } from "../../services/tictactoe.ts";
import "../../styles/tictactoe.css";
import { BoardCells } from "../../types.ts";


export const TicTacToePage = () => {
    const [boardCells, setBoardCells] = useState<BoardCells>(Array(9).fill(null));
    const [history, setHistory] = useState<Array<BoardCells>>([boardCells]);
    const [xIsNext, setXIsNext] = useState(true);

    function handlePlay(nextSquares: BoardCells) {
        setBoardCells(nextSquares);
        setXIsNext(prevPlayer => !prevPlayer);
        setHistory([...history, nextSquares]);
    }

    function handleJumpToMove(move: number) {
        setBoardCells(history[move]);
        setXIsNext(move % 2 === 0);
        setHistory(history.slice(0, move + 1));
    }

    function resetGame() {
        const newBoardCells = Array(9).fill(null);
        setBoardCells(newBoardCells);
        setHistory([newBoardCells]);
        setXIsNext(true);
    }

    useEffect(() => {
        document.body.style.background = "#17171f";
        document.body.style.color = "var(--text-color)";
        document.body.style.textAlign = "center";
        return () => {
            document.body.style.background = "inherit";
            document.body.style.color = "inherit";
            document.body.style.textAlign = "inherit";
        };
    }, []);

    const winner = calculateWinner(boardCells);
    return (
        <div className="game">
            <div>
                <h2 className={`status ${winner ? "winner" : ""}`}>
                    {winner ? `Winner: ${winner}`
                        : history.length > 9 ? "It's a tie!"
                            : `Next player: ${xIsNext ? "X" : "O"}`}
                </h2>
                <Button type="lifted" onClick={resetGame} buttonNativeProps={{
                    style: {
                        margin: "1rem 0",
                        visibility: winner || history.length > 9 ? "visible" : "hidden"
                    }
                }}>Reset Game</Button>
                <Board xIsNext={xIsNext} squares={boardCells} onPlay={handlePlay}/>
            </div>
            <div>
                <h1>Game History</h1>
                <History history={history} onJumpToMove={handleJumpToMove}/>
            </div>
        </div>
    );
};
