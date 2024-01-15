import './Header.css'
import React, { useState, useEffect, useCallback } from "react"
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useLocation } from "react-router-dom"

import { DemoRoute } from '@/ReactDemo/DemoRoute'
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

    const DemoNavDropdownItems = DemoRoute.children?.filter(p => p.path)
        .filter(p => p.show && p.show() || !p.show).map(p => {
            let href = p.href
            if (!href) {
                href = DemoRoute.path + "/" + p.path
            }

            let display = p.display
            if (!display) {
                display = p.path
            }
            return (
                <NavDropdown.Item key={href} eventKey={href} href={href} >{display}</NavDropdown.Item>
            )
        })

    const DemoNavDropdown = <NavDropdown title={DemoRoute.display} id={DemoRoute.display} active={DemoRoute.checkActive!(location.pathname)}>
        {DemoNavDropdownItems}
    </NavDropdown>

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
                    {DemoNavDropdown}
                </Nav>
            </div>
            <div className="header-user">
                <User></User>
            </div>
        </div >
    )
}

export default React.memo(Header)
