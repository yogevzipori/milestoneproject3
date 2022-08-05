import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card"

export default function Signup() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(null);
    
    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch("/users/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.status === 200) {
            navigate("/login");
        } else {
            setErrorMessage(data.message);
            setFirstName("")
            setLastName("")
            setEmail("")
            setPassword("")
        }
    };

    return (
        <div className="content">
            <h1>Sign up Page</h1>

            {errorMessage != null
                ? (
                    <div>{errorMessage}</div>
                )
                :null
            }
                <Card>
                    <Form id="signupForm" onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor="firstName">First Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                id="firstName"
                                name="firstName"
                            />
                        </Form.Group>
                        <br></br>
                        <Form.Group>
                            <Form.Label htmlFor="lastName">Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                id="lastName"
                                name="lastName"
                            />
                        </Form.Group>
                        <br></br>
                        <Form.Group>
                            <Form.Label htmlFor="email">Email</Form.Label>
                                <Form.Control
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                id="email"
                                name="email"
                            />
                        </Form.Group>
                        <br></br>
                        <Form.Group>
                            <Form.Label htmlFor="password">Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                id="password"
                                name="password"
                            />
                        </Form.Group>
                        <br></br>
                        <Button variant="dark" type="submit">Submit</Button>
                        <Button variant="dark" onClick={() => navigate("/login")}>Back to login</Button>
                    </Form>
                </Card>
        </div>
    );
};