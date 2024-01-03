import './Header.css'
import React, { useState, useEffect } from "react"
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useLocation } from "react-router-dom"

import { User } from "@/User/User"

const Header = (props: any) => {
    const location = useLocation()
    const [activeKey, setActiveKey] = useState('')

    const handleSelect = (eventKey: any) => {
        setActiveKey(eventKey)
    }

    const checkActive = (t: string) => {
        const path = location.pathname
        if (t == 'openai') {
            if (path == '/examples' || path == '/playground') {
                return true
            } else {
                return false
            }
        }

        if (t == 'base') {
            if (path.startsWith('/demo')) {
                return true
            } else {
                return false
            }
        }

        return false
    }

    useEffect(() => {
        const path = location.pathname
        if (path == '/') {
            setActiveKey('/home')
        } else if (path.startsWith('/flow')) {
            setActiveKey('/flow')
        } else {
            setActiveKey(path)
        }
    }, [location])
    return (

        <div className='header-container'>
            <div className="header-nav">
                <Nav variant="pills" activeKey={activeKey} onSelect={handleSelect}>
                    <Nav.Item>
                        <Nav.Link eventKey="/home" href="/" title="Home">
                            Home
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="/aws" href="/aws" title="AWS">
                            AWS
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
                    <Nav.Item>
                        <Nav.Link eventKey="/whiteboards" href="/whiteboards" title="Whiteboard">
                            Whiteboard
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="/excalidraw" href="/excalidraw" title="Excalidraw">
                            Excalidraw
                        </Nav.Link>
                    </Nav.Item>
                    <NavDropdown title="OpenAI" id="OpenAI" active={checkActive('openai')}>
                        <NavDropdown.Item eventKey="/examples" href="/examples" title="Flow">Examples</NavDropdown.Item>
                        <NavDropdown.Item eventKey="/playground" href="/playground" title="Flow">Playground</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="BaseDemo" id="nav-dropdown" active={checkActive('base')}>
                        <NavDropdown.Item eventKey="/demo/app" href="/demo/app" >App</NavDropdown.Item>
                        <NavDropdown.Item eventKey="/demo/game" href="/demo/game" >Game</NavDropdown.Item>
                        <NavDropdown.Item eventKey="/demo/form" href="/demo/form" >Form</NavDropdown.Item>
                        <NavDropdown.Item eventKey="/demo/calculator" href="/demo/calculator" >Calculator</NavDropdown.Item>
                        <NavDropdown.Item eventKey="/demo/dialog" href="/demo/dialog" >Dialog</NavDropdown.Item>
                        <NavDropdown.Item eventKey="/demo/split" href="/demo/split" >Split</NavDropdown.Item>
                        <NavDropdown.Item eventKey="/demo/bailout" href="/demo/bailout" >Bailout</NavDropdown.Item>
                        <NavDropdown.Item eventKey="/demo/withbailout" href="/demo/withbailout" >Withbailout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </div>
            <div className="header-user">
                <User></User>
            </div>
        </div >
    )
}

export default React.memo(Header)
