import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUser } from '../contexts/CurrentUser';

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

export default function Login() {
    const navigate = useNavigate();

    const { setCurrentUser }  = useContext(CurrentUser);

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch("/authentication/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        const data = await response.json();
        console.log(data)
        if (data.token) {
            setCurrentUser(data.user);
            localStorage.setItem("token", data.token)
            navigate("/");
        } else {
            setErrorMessage(data.message);
        };
    };

    return (
        <div className="content">
            <h1>Login Page</h1>
            {errorMessage != null
                ? (
                    <div>{errorMessage}</div>
                )
                :null
            }
                <Card>
                    <Form id="loginForm" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={credentials.email}
                                onChange={e => setCredentials({ ...credentials, email: e.target.value})}
                                id="email"
                                name="email"
                            />
                        </Form.Group>
                        <br></br>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="htmlFor">Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={credentials.password}
                                onChange={e => setCredentials({ ...credentials, password: e.target.value})}
                                id="password"
                                name="password"
                            />
                        </Form.Group>
                        <br></br>
                        <Button variant="dark" type="submit">Submit</Button>
                        <Button variant="dark" onClick={() => navigate("/signup")}>Create account</Button>
                    </Form>
                </Card>
        </div>
    );
};