import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function EditWorkout() {

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(JSON.stringify(workout))
    let res = await fetch(`http://localhost:5001/workouts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workout)
    });
    navigate("/")
  };

  let { id } = useParams();

  const [foundWorkout, setFoundWorkout] = useState(null);
  const [workoutName, setWorkoutName] = useState("");
  const [workoutNotes, setWorkoutNotes] = useState("");
  const [userAssigned, setUserAssigned] = useState("");
  const [users, setUsers] = useState("");

  const [workout, setWorkout] = useState({
    name: "",
    description: ""
  })

  // fetch for the workout that was clicked
  useEffect(() => {
    fetch(`http://localhost:5001/workouts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFoundWorkout(data);
        setWorkoutName(data.name);
        setWorkout({
          name: data.name,
          description: ""
        });
        setWorkoutNotes(data.Notes);
      });
  }, []);

  // fetch for users
  useEffect(() => {
    fetch(`http://localhost:5001/users`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  }, []);

  //   this prevents our component from trying to render the below before the data comes in
  if (foundWorkout === null || users === null) {
    return <p>Loading Stuff!</p>;
  }

  console.log(foundWorkout.user)

  return (
    <div id="editworkout">
      <h1>Edit Workout</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" />
          <Form.Label>Workout Type</Form.Label>
          <Form.Control
            type="text"
            defaultValue={workoutName}
            onChange={e => setWorkout({ ...workout, name: e.target.value})}
          />
        <Form.Group className="mb-3">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            defaultValue={workoutNotes}
            onChange={e => setWorkout({ ...workout, description: e.target.value})}
          />
        </Form.Group>
        {/* causing error with loading edit page */}
        {/* <Form.Group className="mb-3">
          <Form.Label>User Assigned</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setuserAssigned(e.target.value)}
          >
          {Users.map((user)=>{
            return (
              <option value={user._id} key={user._id}>{user.name}</option>
            )
          })}
          </Form.Select>
        </Form.Group> */}
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </div>
  );
}