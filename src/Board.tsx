import { React, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Square from './Square'

function Board() {
    const status = 'Next player: X';

    const [state, setState] = useState(Array(9).fill(null))

    const handleClick = (i: number) => {
        const squares = state.slice();
        squares[i] = 'X';
        console.log(squares);
        setState(squares);
    }

    const renderSquare = (i: number) => {
        return <Square value={state[i]} onClick={() => handleClick(i)} />;
    }

    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    )
}

export default Board