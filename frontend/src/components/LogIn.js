import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUser } from '../contexts/CurrentUser';

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"

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

        if (response.status === 200) {
            console.log(data)
            setCurrentUser(data.user);
            localStorage.setItem("token", data.token)
            navigate("/");
        } else {
            setErrorMessage(data.message);
        };
    };

    return (
        <div>

            <h1>Login Page</h1>

            {errorMessage != null
                ? (
                    <div>{errorMessage}</div>
                )
                :null
            }

            <div id="login">

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

                    <Form.Group className="mb-3"/>
                    <Form.Label htmlFor="htmlFor">Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={credentials.password}
                        onChange={e => setCredentials({ ...credentials, password: e.target.value})}
                        id="password"
                        name="password"
                    />
                    <br></br>
                    <Button variant="outline-dark" type="submit">Submit</Button>
                </Form>
                <br></br>
                <Button variant="outline-dark" onClick={() => navigate("/signup")}>Create account</Button>

            </div>

        </div>
    );
};