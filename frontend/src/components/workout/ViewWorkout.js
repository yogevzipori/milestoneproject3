import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default function ReadWorkout() {
    const navigate = useNavigate();

    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const data = await fetch("/workouts");
                const json = await data.json();
                setWorkouts(json);
            } catch (err) {
                console.log(err);
            };
        };
        fetchWorkouts();
    }, []);

    const deleteWorkout = async (id) => {
        await fetch(`/workouts/${id}`, {
            method: "DELETE"
        });
    };

    return (
        <div className="content">
            <h1>Welcome back</h1>
            <div>
                {workouts.map((workout) => {
                    return (
                        <div id={workout._id} key={workout._id}>
                            <Card>
                                <Card.Header>Created by {workout.createdBy}</Card.Header>
                                <Card.Body key={workout._id}>
                                    <Card.Title>{workout.name}</Card.Title>
                                    <Card.Text>{workout.type} exercise</Card.Text>
                                    <Card.Text>{workout.sets} sets x {workout.reps} reps</Card.Text>
                                    <Card.Text>{workout.time} minutes</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Button variant="outline-dark" id="updateButton" onClick={ () => navigate(`/workouts/${workout._id}`) }>Update</Button>
                                    <Button variant="outline-danger" id="deleteButton" onClick={ () => { deleteWorkout(workout._id); window.location.reload(true) } }>Delete</Button>
                                </Card.Footer>
                            </Card>
                            <br></br>
                        </div>
                    )
                })}
                <Button variant="outline-dark" id="createButton" onClick={() => navigate("/add")}>Create Workout</Button>
            </div>
        </div>
    );
};