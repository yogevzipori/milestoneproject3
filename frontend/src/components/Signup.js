// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function Signup() {

//     const navigate = useNavigate();

//     const [user, setUser] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         password: ""
//     });
    
//     async function handleSubmit(e) {
//         e.preventDefault();
//         await fetch("http://localhost:5001/users/", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(user)
//         });
//         navigate("/");
//     };

//     return (
//         <div>
//             <h1>Sign up Page</h1>
//             <div>
//                 <form id="signup" onSubmit={handleSubmit}>
//                     <label htmlFor="firstName">First Name</label>
//                     <input
//                         type="text"
//                         value={user.firstName}
//                         onChange={e => setUser({ ...user, firstName: e.target.value})}
//                         id="firstName"
//                         name="firstName"></input><br></br>

//                     <label htmlFor="lastName">Last Name</label>
//                     <input
//                         type="text"
//                         value={user.lastName}
//                         onChange={e => setUser({ ...user, lastName: e.target.value})}
//                         id="lastName"
//                         name="lastName"></input><br></br>

//                     <label htmlFor="email">Email</label>
//                     <input
//                         type="email"
//                         value={user.email}
//                         onChange={e => setUser({ ...user, email: e.target.value})}
//                         id="email"
//                         name="email"></input><br></br>

//                     <label htmlFor="password">Password</label>
//                     <input
//                         type="password"
//                         value={user.password}
//                         onChange={e => setUser({ ...user, password: e.target.value})}
//                         id="password"
//                         name="password"></input><br></br>

//                     <button type="submit">Submit</button>
//                 </form>
//                 <button onClick={() => navigate("/")}>Back to login</button>
//             </div>
//         </div>
//     );
// };

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
export default function Signup() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    async function handleSubmit(e) {
        e.preventDefault();
        await fetch("http://localhost:5001/users/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        navigate("/");
    };
    return (
        <div>
            <h1>Sign up Page</h1>
            <div>
                <form id="signup" onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        value={user.firstName}
                        onChange={e => setUser({ ...user, firstName: e.target.value})}
                        id="firstName"
                        name="firstName"
                    />
                    <br></br>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        value={user.lastName}
                        onChange={e => setUser({ ...user, lastName: e.target.value})}
                        id="lastName"
                        name="lastName"
                    />
                    <br></br>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        value={user.email}
                        onChange={e => setUser({ ...user, email: e.target.value})}
                        id="email"
                        name="email"
                    />
                    <br></br>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        value={user.password}
                        onChange={e => setUser({ ...user, password: e.target.value})}
                        id="password"
                        name="password"
                    />
                    <br></br>
                    <Button variant="outline-primary" type="submit">Submit</Button>
                </form>
                <Button variant="outline-primary" onClick={() => navigate("/")}>Back to login</Button>
            </div>
        </div>
    );
};