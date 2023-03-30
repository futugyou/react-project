import { Outlet, NavLink, useNavigation } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function Layout() {
    const navigation = useNavigation();

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
                            <NavLink to={`app`} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >App</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={`default-qa`} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >Q&A</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={`game`} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >Game</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={`from`} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >NameForm</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={`calculator`} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >Calculator</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={`dialog`} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >WelcomeDialog</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={`split`} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >SplitPaneApp</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={`bailout`} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >Bailout</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={`withbailout`} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""} >WithoutBailout</NavLink>
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
                    <Row className={navigation.state === "loading" ? "flex-grow-1 flex-fill loading" : "flex-grow-1 flex-fill"}>
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