import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function EditWorkout() {

  let { workoutId } = useParams();
  const [FoundWorkout, setFoundWorkout] = useState(null);
  const [WorkoutName, setWorkoutName] = useState("");
  const [WorkoutNotes, setWorkoutNotes] = useState("");
  const [userAssigned, setuserAssigned] = useState("");
  const [Users, setUsers] = useState("");

  // fetch for the workout that was clicked
  useEffect(() => {
    fetch(`http://localhost5000/workouts/${workoutId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFoundWorkout(data);
        setWorkoutName(data.name);
        setWorkoutNotes(data.Notes);
      });
  }, []);

  // fetch for users
  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  }, []);

  let handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/workouts:" + workoutId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: WorkoutName,
        details: WorkoutNotes,
        // user: userAssigned,
      }),
    });
  };

  //   this prevents our component from trying to render the below before the data comes in
  if (FoundWorkout === null || Users === null) {
    return <p>Loading Stuff!</p>;
  }

  console.log(FoundWorkout.user)

  return (
    <div id="editworkout">
      <h1>Edit Workout</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" />
          <Form.Label>Workout Type</Form.Label>
          <Form.Control
            type="text"
            defaultValue={WorkoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
          />
<Form.Group className="mb-3">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            defaultValue={WorkoutNotes}
            onChange={(e) => setWorkoutNotes(e.target.value)}
          />
        </Form.Group>
        {/* causing  with loading edit page */}
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