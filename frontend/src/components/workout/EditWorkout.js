import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"

export default function UpdateWorkout() {
    const navigate = useNavigate();

    const { id } = useParams();

    const [foundWorkout, setFoundWorkout] = useState(null);
    const [workout, setWorkout] = useState({
        name: "",
        description: ""
    });

    useEffect(() => {
        fetch(`http://localhost:5001/workouts/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setFoundWorkout(data)
                setWorkout({
                    name: data.name,
                    description: data.description
                });
            });
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        let res = await fetch(`http://localhost:5001/workouts/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(workout)
        });
        navigate("/");
    };

    if (foundWorkout === null) {
        return <p>Loading...</p>
    };

    return (
        <div>

            <h1>Update Workout Component</h1>

            <div>

                <Form onSubmit={handleSubmit}>

                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={workout.name}
                        onChange={e => setWorkout({ ...workout, name: e.target.value })}
                        id="name"
                        name="name"
                    />

                    <br></br>

                    <Form.Label htmlFor="description">Description</Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={workout.description}
                        onChange={e => setWorkout({ ...workout, description: e.target.value })}
                        id="description"
                        name="description"
                    />

                    <br></br>

                    <Button variant="outline-dark" type="submit">Submit</Button>

                </Form>

                <br></br>

                <Button variant="outline-dark" onClick={() => navigate(-1)}>Back</Button>

            </div>

        </div>
    );
};