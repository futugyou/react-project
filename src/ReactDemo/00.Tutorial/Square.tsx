const Square = (props: any) => {
    return (
        <button className="square" onClick={props.onSquareClick}>
            {props.value}
        </button>
    )
}

export default Square