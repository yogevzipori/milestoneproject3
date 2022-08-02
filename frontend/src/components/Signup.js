import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Signup() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(null);
    
    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch("http://localhost:5001/users/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
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
        <div>

            <h1>Sign up Page</h1>

            {errorMessage != null
                ? (
                    <div>{errorMessage}</div>
                )
                :null
            }

            <div id="signup">

                <Form id="signupForm" onSubmit={handleSubmit}>

                    <Form.Label htmlFor="firstName">First Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        id="firstName"
                        name="firstName"
                    />

                    <Form.Label htmlFor="lastName">Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        id="lastName"
                        name="lastName"
                    />

                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        id="email"
                        name="email"
                    />

                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        id="password"
                        name="password"
                    />

                    <br></br>

                    <Button variant="outline-dark" type="submit">Submit</Button>

                </Form>

                <br></br>

                <Button variant="outline-dark" onClick={() => navigate("/login")}>Back to login</Button>

            </div>

        </div>
    );
};