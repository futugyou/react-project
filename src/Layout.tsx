import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Nav } from 'react-bootstrap'
function Layout() {
    return (
        <>
            <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">

            </nav>

            <div className="row page-body-wrapper">
                <Nav className="col-sm-2">
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                            <Link to="/">App</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Game">Game</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/NameForm">NameForm</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Calculator">Calculator</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/WelcomeDialog">WelcomeDialog</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/SplitPaneApp">SplitPaneApp</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Bailout">Bailout</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/WithoutBailout">WithoutBailout</Link>
                        </li>
                    </ul>
                </Nav>
                <div className="col-sm-10">
                    <Outlet />
                </div>
            </div>

            <div className="footer">

            </div>
        </ >
    );
}
export default Layout