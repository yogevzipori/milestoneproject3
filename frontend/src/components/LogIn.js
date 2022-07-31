// import React from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

// export default function LoginForm() {
//   return (
//     <div>
//     <Form style={{ width: '35vw' ,margin: '10 auto', marginLeft:'300'}}>
//       <Form.Group className="mb-3 " controlId="formBasicEmail">
//         <Form.Label>Email address</Form.Label>
//         <Form.Control type="email" placeholder="Enter email" />
//         <Form.Text className="text-muted">
//           We'll never share your email with anyone else.
//         </Form.Text>
//       </Form.Group>
//       <Form.Group className="mb-3 email" controlId="formBasicPassword">
//         <Form.Label>Password</Form.Label>
//         <Form.Control type="password" placeholder="Password" />
//       </Form.Group>
//       <Button variant="primary" type="submit">
//         Submit
//       </Button>
//     </Form>
//     </div>
//   );
// }

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUser } from '../contexts/CurrentUser';

export default function Login() {

    const navigate = useNavigate();

    const { setCurrentUser }  = useContext(CurrentUser) || {};

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/authentication/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (response.status === 200) {
            setCurrentUser(data.user);
            localStorage.setItem("token", data.token);
            navigate("/home");
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
            };

            <div>
                <form id="login" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        value={credentials.email}
                        onChange={e => setCredentials({ ...credentials, email: e.target.value})}
                        id="email"
                        name="email"/><br></br>

                    <label htmlFor="htmlFor">Password</label>
                    <input
                        type="password"
                        value={credentials.password}
                        onChange={e => setCredentials({ ...credentials, password: e.target.value})}
                        id="password"
                        name="password"/><br></br>

                    <button type="submit">Submit</button>
                </form>
                <button onClick={() => navigate("/signup")}>Create account</button>
            </div>

        </div>
    );
};