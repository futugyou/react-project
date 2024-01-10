import './Header.css'
import React, { useState, useEffect, useCallback } from "react"
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

    const checkActive = useCallback((t: string) => {
        const path = location.pathname
        if (t == 'openai') {
            if (path == '/examples' || path == '/playground') {
                return true
            } else {
                return false
            }
        }

        if (t == 'whiteboard') {
            if (path == '/fluid' || path == '/excalidraw' || path == '/tldraw' || path == '/minitldraw') {
                return true
            } else {
                return false
            }
        }

        if (t == 'basic') {
            if (path.startsWith('/basic')) {
                return true
            } else {
                return false
            }
        }

        return false
    }, [])

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
                <Nav variant="pills" activeKey={activeKey} onSelect={handleSelect}>
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
                    <NavDropdown title="Whiteboard" id="Whiteboard" active={checkActive('whiteboard')}>
                        <NavDropdown.Item eventKey="/fluid" href="/fluid" title="Fluid">Fluid</NavDropdown.Item>
                        <NavDropdown.Item eventKey="/excalidraw" href="/excalidraw" title="Excalidraw">Excalidraw</NavDropdown.Item>
                        <NavDropdown.Item eventKey="/tldraw" href="/tldraw" title="Tldraw">Tldraw</NavDropdown.Item>
                        <NavDropdown.Item eventKey="/minitldraw" href="/minitldraw" title="Tldraw">MiniTldraw</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="OpenAI" id="OpenAI" active={checkActive('openai')}>
                        <NavDropdown.Item eventKey="/examples" href="/examples" title="Flow">Examples</NavDropdown.Item>
                        <NavDropdown.Item eventKey="/playground" href="/playground" title="Flow">Playground</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Basic" id="basic" active={checkActive('basic')}>
                        <NavDropdown.Item eventKey="/basic/app" href="/basic/app" >App</NavDropdown.Item>
                        <NavDropdown.Item eventKey="/basic/game" href="/basic/game" >Game</NavDropdown.Item>
                        <NavDropdown.Item eventKey="/basic/form" href="/basic/form" >Form</NavDropdown.Item>
                        <NavDropdown.Item eventKey="/basic/calculator" href="/basic/calculator" >Calculator</NavDropdown.Item>
                        <NavDropdown.Item eventKey="/basic/dialog" href="/basic/dialog" >Dialog</NavDropdown.Item>
                        <NavDropdown.Item eventKey="/basic/split" href="/basic/split" >Split</NavDropdown.Item>
                        <NavDropdown.Item eventKey="/basic/bailout" href="/basic/bailout" >Bailout</NavDropdown.Item>
                        <NavDropdown.Item eventKey="/basic/withbailout" href="/basic/withbailout" >Withbailout</NavDropdown.Item>
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
