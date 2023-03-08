import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Nav } from 'react-bootstrap'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function Layout() {
    return (
        <>
            <Row className="header">
                <Col>
                    <h5>Header</h5>
                </Col>
            </Row>
            <Row className="mid-container flex-grow-1 flex-fill">
                <Col xs={2}>
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                            <Link to="/">App</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/default-qa">Q&A</Link>
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
                </Col>
                <Col xs={10}>
                    <Row >
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">App</Breadcrumb.Item>
                            <Breadcrumb.Item href="/Game">Game</Breadcrumb.Item>
                            <Breadcrumb.Item active>Data</Breadcrumb.Item>
                        </Breadcrumb>
                    </Row>
                    <Outlet />

                </Col>
            </Row>

            <Row className="footer" >
                <Col>
                    <h5>Footer</h5>
                </Col>
            </Row>
        </>
    );
}
export default Layout