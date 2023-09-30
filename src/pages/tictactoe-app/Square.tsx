import React from "react";
import { BoardCells } from "../../types.ts";

interface SquareProps {
    value?: BoardCells[number];
    onSquareClick: () => void;
}

export const Square: React.FC<SquareProps> = ({ value, onSquareClick }) => {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
};
