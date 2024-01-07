
import React from "react"

export const MenuItem: React.FC<{
    children?: React.ReactNode,
    text: string,
    onClick: () => void
}> = React.memo((props) => {

    return (
        <button onClick={props.onClick} data-testid="init-button"
            aria-label={props.text} title={props.text} type="button"
            className="dropdown-menu-item dropdown-menu-item-base">
            <div className="dropdown-menu-item__icon">
                {props.children}
            </div>
            <div className="dropdown-menu-item__text">{props.text}</div>
        </button>
    )
})
