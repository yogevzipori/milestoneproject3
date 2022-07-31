import React from 'react'

export default function DeleteWorkout() {

  const deleteWorkout = async (id) => {
    await fetch(`http://localhost:5001/workouts/delete/${id}`,{
      method:"DELETE"
    });
  };

  return (
    <div>
      <h1>Delete Workout Component</h1>
      
    </div>
  )
}