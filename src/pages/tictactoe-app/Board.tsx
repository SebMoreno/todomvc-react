import { Square } from "./Square.tsx";
import { FC } from "react";
import { BoardCells } from "../../types";
import { calculateWinner } from "../../services/tictactoe.ts";

interface BoardProps {
    xIsNext: boolean;
    squares: BoardCells;
    onPlay: (nextSquares: BoardCells) => void;
}

export const Board: FC<BoardProps> = ({xIsNext, squares, onPlay}) => {
    function handleClick(i: number) {
        if (!calculateWinner(squares) && !squares[i]) {
            onPlay(squares.with(i, xIsNext ? 'X' : 'O'));
        }
    }

    return (
        <div className="board">
            {squares.map((square, i) => (
                <Square key={i} value={square} onSquareClick={() => handleClick(i)}/>
            ))}
        </div>
    );
};


