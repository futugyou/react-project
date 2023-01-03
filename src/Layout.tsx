import { Routes, Route, Outlet, Link } from "react-router-dom";

function Layout() {
    return (
        <div>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/App">App</Link>
                        </li>
                        <li>
                            <Link to="/Game">Game</Link>
                        </li>
                        <li>
                            <Link to="/NameForm">NameForm</Link>
                        </li>
                        <li>
                            <Link to="/Calculator">Calculator</Link>
                        </li>
                        <li>
                            <Link to="/WelcomeDialog">WelcomeDialog</Link>
                        </li>
                        <li>
                            <Link to="/SplitPaneApp">SplitPaneApp</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
}
export default Layout