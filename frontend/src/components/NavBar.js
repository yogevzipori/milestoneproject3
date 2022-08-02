import React, { useContext, useState } from 'react';
import { CurrentUser } from '../contexts/CurrentUser';

import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

export default function NavBar(props) {

    const { currentUser, setCurrentUser } = useContext(CurrentUser)

    const [ loggedOut, setLoggedOut ] = useState(false)

    const logOut = async () => {
        await fetch("http://localhost:3001/authentication/logout", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        })
        setCurrentUser(null)
        localStorage.removeItem("token")
        setLoggedOut(true)
    }

    return (
        <div>
            <div id="navbar">
                <Navbar bg="dark" variant="dark">
                    <Container>
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
                            <Nav.Item>
                                <Nav.Link onClick={() => {
                                    setLoggedOut(true)
                                    logOut()
                                    window.location.reload(true)
                                    }}>Log out</Nav.Link>    
                            </Nav.Item>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        </div>
    );
};