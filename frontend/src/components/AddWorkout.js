import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AddWorkout() {

  const navigate = useNavigate()

  const [workout, setWorkout] = useState({
    name: "",
    description: ""
  })

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("http://localhost:5001/workouts/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workout)
    });
    navigate("/");
};

  return (
    <div>
      <h1>Add Workout Page</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={workout.name}
            onChange={e => setWorkout({ ...workout, name: e.target.value})}
            id="name"
            name="name">
          </input><br></br>

          <label htmlFor="description">Description</label>
          <input
            type="text"
            value={workout.description}
            onChange={e => setWorkout({ ...workout, description: e.target.value})}
            id="description"
            name="description">
          </input><br></br>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};