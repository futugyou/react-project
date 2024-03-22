import './Header.css'
import React, { useState, useEffect, useCallback } from "react"
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useLocation } from "react-router-dom"

import { TotalRouteDescriptions } from '@/Route'
import { User } from "@/User/User"

const Header = (props: any) => {
    const location = useLocation()
    const [activeKey, setActiveKey] = useState('')

    const handleSelect = (eventKey: any) => {
        setActiveKey(eventKey)
    }

    const checkActive = useCallback((t: string) => {
        const path = location.pathname
        if (t == 'openai') {
            return path.startsWith('/openai')
        }

        return false
    }, [])

    const items = TotalRouteDescriptions.filter(p => p.show && p.show() || !p.show).map(route => {
        return (
            <NavDropdown key={route.display} title={route.display} id={route.display} active={route.checkActive!(location.pathname)}>
                {
                    route.children?.filter(p => p.path)
                        .filter(p => p.show && p.show() || !p.show).map(p => {
                            let href = p.href
                            if (!href) {
                                href = route.path + "/" + p.path
                            }

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
        } else {
            setActiveKey(path)
        }
    }, [location, checkActive])

    return (
        <div className='header-container'>
            <div className="header-nav">
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
                    {/* <Nav.Item>
                        <Nav.Link eventKey="/nextjs" href="/nextjs" title="Nextjs">
                            Nextjs
                        </Nav.Link>
                    </Nav.Item> */}
                    <Nav.Item>
                        <Nav.Link eventKey="/flow" href="/flow" title="Flow">
                            Flow
                        </Nav.Link>
                    </Nav.Item>
                    <NavDropdown title="OpenAI" id="OpenAI" active={checkActive('openai')}>
                        <NavDropdown.Item eventKey="/openai/examples" href="/openai/examples" title="Flow">Examples</NavDropdown.Item>
                        <NavDropdown.Item eventKey="/openai/playground" href="/openai/playground" title="Flow">Playground</NavDropdown.Item>
                    </NavDropdown>
                    {items}
                </Nav>
            </div>
            <div className="header-user">
                <User></User>
            </div>
        </div >
    )
}

export default React.memo(Header)
