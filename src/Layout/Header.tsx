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
            {/* <div className="header-nav">
                <div className="header-route-container">
                    <NavLink to="/">Home</NavLink>
                </div>
                <div className="header-route-container">
                    <NavLink to="/aws">Vue Demo</NavLink>
                </div>
                <div className="header-route-container">
                    <NavLink to="/flow">React Flow</NavLink>
                </div>
                <div className="header-route-container" >
                    <a className="dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">OpenAI Demo</a>
                    <ul className="dropdown-menu" >
                        <li>
                            <NavLink to="/examples" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >Examples</NavLink>
                        </li>
                        <li>
                            <NavLink to="/playground" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >Playground</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="header-route-container" >
                    <a className="dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">React Demo</a>
                    <ul className="dropdown-menu" >
                        <li>
                            <NavLink to="/demo/app" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >App</NavLink>
                        </li>
                        <li>
                            <NavLink to="/demo/game" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >Game</NavLink>
                        </li>
                        <li>
                            <NavLink to="/demo/from" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >NameForm</NavLink>
                        </li>
                        <li>
                            <NavLink to="/demo/calculator" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >Calculator</NavLink>
                        </li>
                        <li>
                            <NavLink to="/demo/dialog" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >WelcomeDialog</NavLink>
                        </li>
                        <li>
                            <NavLink to="/demo/split" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >SplitPaneApp</NavLink>
                        </li>
                        <li>
                            <NavLink to="/demo/bailout" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >Bailout</NavLink>
                        </li>
                        <li>
                            <NavLink to="/demo/withbailout" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >WithoutBailout</NavLink>
                        </li>
                    </ul>
                </div>
            </div > */}
            <div className="header-user">
                <User></User>
            </div>
        </div >
    )
}

export default React.memo(Header)
