import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { CurrentUser } from '../../contexts/CurrentUser';

export default function ReadWorkout() {
    const navigate = useNavigate();

   let { currentUser } = useContext(CurrentUser)

    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const data = await fetch("http://localhost:5001/workouts");
                const json = await data.json();
                setWorkouts(json);
            } catch (err) {
                console.log(err);
            };
        };
        fetchWorkouts();
    }, []);

    const deleteWorkout = async (id) => {
        await fetch(`http://localhost:5001/workouts/${id}`, {
            method: "DELETE"
        });
    };

    return (
        <>
            {
                currentUser = !null 
                    ? (
                        <h1>Welcome back, {CurrentUser.firstName} </h1>
                    )
                    :null
            }
            {workouts.map((workout) => {
                return (
                    <>
                        <div key={workout._id}>
                            <Card>
                                <Card.Header>*Workout creator goes here*</Card.Header>
                                <Card.Body>
                                    <Card.Title>{workout.name}</Card.Title>
                                    <Card.Text>{workout.description}</Card.Text>
                                    <Button variant="outline-dark" id="/edit/:id" onClick={() => navigate(`/workouts/${workout._id}`)}>Update</Button>
                                    <Button variant="outline-dark" id="delete" onClick={() => { deleteWorkout(workout._id); window.location.reload(true); } }>Delete</Button>
                                </Card.Body>
                            </Card>
                        </div>
  
                        <br></br>
                    </>
                ) 
            })}    
            <Button variant="outline-dark" id="create" onClick={() => navigate("/add")}>Create Workout</Button>
        </>
    );
};