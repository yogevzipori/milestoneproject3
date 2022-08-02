import React, { useContext, useState } from 'react'
import { CurrentUser } from '../../contexts/CurrentUser';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function CreateWorkout() {
  const navigate = useNavigate();

  const { currentUser, setCurrentUser } = useContext(CurrentUser)

  const [workout, setWorkout] = useState({
    name: "",
    description: "",
    createdBy: ""
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("http://localhost:5001/workouts/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workout)
    });
    setWorkout({workout})
    navigate("/");
};

    return (
        <div>

            <h1>Add Workout Page</h1>

            <div>

                <Form onSubmit={handleSubmit}>

                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={workout.name}
                        onChange={e => setWorkout({ ...workout, name: e.target.value})}
                        id="name"
                        name="name"
                    />

                    <br></br>

                    <Form.Label htmlFor="description">Description</Form.Label>
                    <Form.Control
                        type="text"
                        value={workout.description}
                        onChange={e => setWorkout({ ...workout, description: e.target.value})}
                        id="description"
                        name="description"
                    />

                    <br></br>

                    <Button variant="outline-dark" type="submit">Submit</Button>

                </Form>

                <br></br>

                <Button variant="outline-dark" onClick={() => navigate("/")}>Back</Button>

            </div>

        </div>
    );
};