import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Navbar } from 'react-bootstrap'
function Layout() {
    return (
        <div className="row">
            <div className="col-sm-2">
                <Navbar>
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
                    </ul>
                </Navbar>
            </div>
            <div className="col-sm-10">
                <Outlet />
            </div>
        </div>
    );
}
export default Layout