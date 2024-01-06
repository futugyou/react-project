
import React from "react"

export const MenuItem: React.FC<{
    children?: React.ReactNode,
    Text: string,
    onClick: () => void
}> = React.memo((props) => {

    return (
        <button onClick={props.onClick} data-testid="init-button" aria-label={props.Text} type="button" className="dropdown-menu-item dropdown-menu-item-base" title={props.Text}>
            <div className="dropdown-menu-item__icon">
                {props.children}
            </div>
            <div className="dropdown-menu-item__text">{props.Text}</div>
        </button>
    )
})
