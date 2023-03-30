import { Outlet, Link } from "react-router-dom";
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
            <Row className="flex-grow-1 flex-fill">
                <Col xs={2}>
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                            <Link to="/app">App</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/default-qa">Q&A</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/game">Game</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/from">NameForm</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/calculator">Calculator</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/dialog">WelcomeDialog</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/split">SplitPaneApp</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/bailout">Bailout</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/withbailout">WithoutBailout</Link>
                        </li>
                    </ul>
                </Col>
                <Col xs={10} className="d-flex flex-column">
                    <Row >
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">App</Breadcrumb.Item>
                            <Breadcrumb.Item href="/Game">Game</Breadcrumb.Item>
                            <Breadcrumb.Item active>Data</Breadcrumb.Item>
                        </Breadcrumb>
                    </Row>
                    <Row className="flex-grow-1 flex-fill">
                        <Outlet />
                    </Row>
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