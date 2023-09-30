import { BoardCells } from "../../types";
import React from "react";
import { Button } from "../../elements/Button.tsx";

interface HistoryProps {
    history: Array<BoardCells>;
    onJumpToMove: (move: number) => void;
}

export const History: React.FC<HistoryProps> = ({history, onJumpToMove}) => {
    return (
        <ol className="history" start={0}>
            {history.map((_, move) => (
                <li key={move}>
                    <Button type="galaxy" onClick={() => onJumpToMove(move)}>
                        {`Go to ${move > 0 ? `move #${move}` : 'game start'}`}
                    </Button>
                </li>
            ))}
        </ol>
    );
};
