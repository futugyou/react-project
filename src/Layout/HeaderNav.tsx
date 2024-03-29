import './HeaderNav.css'

import React, { useState, useEffect, useCallback } from "react"
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useLocation } from "react-router-dom"

import { RouteDescription } from "@/RouteDescription"

export interface IHeaderNavProps {
    Routes: RouteDescription[]
}

const HeaderNav = (props: IHeaderNavProps) => {
    const location = useLocation()
    const [activeKey, setActiveKey] = useState('')

    const handleSelect = (eventKey: any) => {
        setActiveKey(eventKey)
    }

    const checkActive = (path: string) => path.startsWith('/basic') || path.startsWith('/openai')

    const additionalItems =
        <NavDropdown title={"Archived"} id={"archived"} active={checkActive(location.pathname)} >
            {props.Routes
                .filter(p => p.archived)
                .filter(p => p.show && p.show() || !p.show)
                .map(route =>
                    route.children?.filter(p => p.path)
                        .filter(p => p.show && p.show() || !p.show).map(p => {
                            let href = route.path + "/" + p.path
                            let display = p.display
                            if (!display) {
                                display = p.path
                            }
                            return (
                                <NavDropdown.Item key={href} eventKey={href} href={href} active={href.startsWith(location.pathname)}>{display}</NavDropdown.Item>
                            )
                        })
                )}
        </NavDropdown>

    const items = props.Routes
        .filter(p => p.archived == undefined || p.archived == false)
        .filter(p => p.show && p.show() || !p.show).map(route => {
            return (
                <NavDropdown key={route.display} title={route.display} id={route.display} active={route.checkActive!(location.pathname)}>
                    {
                        route.children?.filter(p => p.path)
                            .filter(p => p.show && p.show() || !p.show).map(p => {
                                let href = route.path + "/" + p.path
                                let display = p.display
                                if (!display) {
                                    display = p.path
                                }
                                return (
                                    <NavDropdown.Item key={href} eventKey={href} href={href} >{display}</NavDropdown.Item>
                                )
                            })}
                </NavDropdown>
            )
        })

    useEffect(() => {
        const path = location.pathname
        if (path == '/') {
            setActiveKey('/home')
        } else if (path.startsWith('/flow')) {
            setActiveKey('/flow')
        } else if (path.startsWith('/basic') || path.startsWith('/openai')) {
            setActiveKey('/archived')
        } else {
            setActiveKey(path)
        }
    }, [location])

    return (
        <Nav data-style="variant" variant="pills" activeKey={activeKey} onSelect={handleSelect}>
            <Nav.Item>
                <Nav.Link eventKey="/home" href="/" title="Home">
                    Home
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="/vue" href="/vue" title="Vue">
                    Vue
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="/flow" href="/flow" title="Flow">
                    Flow
                </Nav.Link>
            </Nav.Item>
            {items}
            {additionalItems}
        </Nav>)
}

export default HeaderNav
