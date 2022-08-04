import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import Card from "react-bootstrap/Card";

export default function UpdateWorkout() {
    const navigate = useNavigate();

    const { id } = useParams();

    const [foundWorkout, setFoundWorkout] = useState(null);
    const [ workout, setWorkout ] = useState({
        name: "",
        sets: "",
        reps: "",
        time: "",
        type: "",
        createdBy: ""
    });

    useEffect(() => {
        fetch(`/workouts/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setFoundWorkout(data)
                setWorkout({
                    name: data.name,
                    sets: data.sets,
                    reps: data.reps,
                    time: data.time,
                    type: data.type,
                    createdBy: data.createdBy
                });
            });
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        fetch(`/workouts/${id}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(workout)
        });
    };

    if (foundWorkout === null) {
        return <p>Fetching exercise...</p>
    };

    return (
        <div className="content">
            <h1>Update Exercise</h1>
            <Card>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label htmlFor="name">Name</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={workout.name}
                            onChange={e => setWorkout({ ...workout, name: e.target.value })}
                            id="name"
                            name="name"
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label htmlFor="type">Type of workout</Form.Label>
                        <Form.Select
                            type="text"
                            defaultValue={workout.type}
                            onChange={e => setWorkout({ ...workout, type: e.target.value })}
                            id="type"
                            name="type"
                        >
                            <option value="Upper body">Upper Body</option>
                            <option value="Lower body">Lower Body</option>
                            <option value="Full body">Full Body</option>
                        </Form.Select>
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label htmlFor="sets">Number of sets</Form.Label>
                        <Form.Control
                            type="number"
                            min={1}
                            defaultValue={workout.sets}
                            onChange={e => setWorkout({ ...workout, sets: e.target.value })}
                            id="sets"
                            name="sets"
                        />
                    </Form.Group>
                    <br></br>             
                    <Form.Group>
                        <Form.Label htmlFor="reps">Number of reps</Form.Label>
                        <Form.Control
                            type="number"
                            min={1}
                            defaultValue={workout.reps}
                            onChange={e => setWorkout({ ...workout, reps: e.target.value })}
                            id="reps"
                            name="reps"
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label htmlFor="time">Time (in minutes)</Form.Label>
                        <Form.Control
                            type="number"
                            min={1}
                            defaultValue={workout.time}
                            onChange={e => setWorkout({ ...workout, time: e.target.value })}
                            id="time"
                            name="time"
                        />
                        </Form.Group>                        <br></br>                               
                    <Button variant="dark" type="submit">Update</Button>
                    <Button variant="dark" onClick={() => navigate("/")}>Back</Button>
                </Form>
            </Card>
        </div>
    );
};