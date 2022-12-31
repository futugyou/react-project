import { React, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Square from './Square'

function Board() {
    const [state, setState] = useState(Array(9).fill(null))
    const [xIsNext, setXIsNext] = useState(true)
    const status = 'Next player: ' + (xIsNext ? 'X' : 'O');

    const handleClick = (i: number) => {
        const squares = state.slice();
        squares[i] = xIsNext ? 'X' : 'O';
        console.log(squares);
        setState(squares);
        setXIsNext(!xIsNext);
    }

    const renderSquare = (i: number) => {
        return <Square value={state[i]} onSquareClick={() => handleClick(i)} />;
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