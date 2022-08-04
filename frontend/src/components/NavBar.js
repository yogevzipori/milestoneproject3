import React, { useContext, useState } from 'react';
// import { CurrentUser } from '../contexts/CurrentUser';

import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

export default function NavBar() {

    // const { curentUser, setCurrentUser } = useContext(CurrentUser)

    // const [ loggedOut, setLoggedOut ] = useState(true)

    // const logOut = async () => {
    //     await fetch("/authentication/logout", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })
    //     setCurrentUser(null)
    //     localStorage.removeItem("token")
    //     setLoggedOut(true)
    // }

    return (
        <Navbar bg="dark" variant="dark" fixed="top">
            <Container>
                <Navbar.Brand>Fit-App</Navbar.Brand>
                <Nav>
                    <Nav.Item>
                        <Nav.Link href="/">Home</Nav.Link>    
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/add">Create</Nav.Link>    
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/login">Login</Nav.Link>    
                    </Nav.Item>
                    {/* <Nav.Item>
                        <Nav.Link onClick={() => {
                            setLoggedOut(true)
                            logOut()
                            window.location.reload(true)
                            }}>Log out
                        </Nav.Link>    
                    </Nav.Item> */}
                </Nav>
            </Container>
        </Navbar>
    );
};