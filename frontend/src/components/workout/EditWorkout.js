// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";

// export default function EditWorkout() {

//   const navigate = useNavigate()

//   async function handleSubmit(e) {
//     e.preventDefault();
//     console.log(JSON.stringify(workout))
//     let res = await fetch(`http://localhost:5001/workouts/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(workout)
//     });
//     navigate("/")
//   };

//   const { id } = useParams();

//   const [foundWorkout, setFoundWorkout] = useState(null);
//   const [workoutName, setWorkoutName] = useState("");
//   const [workoutNotes, setWorkoutNotes] = useState("");
//   const [userAssigned, setUserAssigned] = useState("");
//   const [users, setUsers] = useState("");
//   const [workout, setWorkout] = useState({
//     name: "",
//     description: ""
//   })

//   // fetch for the workout that was clicked
//   useEffect(() => {
//     fetch(`http://localhost:5001/workouts/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setFoundWorkout(data);
//         // setWorkoutName(data.name);
//         setWorkout({
//           name: data.name,
//           description: data.description
//         });
//         // setWorkoutNotes(data.Notes);
//       });
//   }, []);

//   // fetch for users
//   useEffect(() => {
//     fetch(`http://localhost:5001/users`)
//       .then((res) => res.json())
//       .then((data) => {
//         setUsers(data);
//       });
//   }, []);

//   //   this prevents our component from trying to render the below before the data comes in
//   if (foundWorkout === null || users === null) {
//     return <p>Loading Stuff!</p>;
//   }

//   return (
//     <div id="editworkout">
//       <h1>Edit Workout</h1>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3" />
//           <Form.Label>Workout Type</Form.Label>
//           <Form.Control
//             type="text"
//             defaultValue={workout.name}
//             onChange={e => setWorkout({ ...workout, name: e.target.value})}
//           />
//         <Form.Group className="mb-3">
//           <Form.Label>Notes</Form.Label>
//           <Form.Control
//             as="textarea"
//             type="text"
//             defaultValue={workout.description}
//             onChange={e => setWorkout({ ...workout, description: e.target.value})}
//           />
//         </Form.Group>
//         {/* causing error with loading edit page */}
//         {/* <Form.Group className="mb-3">
//           <Form.Label>User Assigned</Form.Label>
//           <Form.Select
//             aria-label="Default select example"
//             onChange={(e) => setuserAssigned(e.target.value)}
//           >
//           {Users.map((user)=>{
//             return (
//               <option value={user._id} key={user._id}>{user.name}</option>
//             )
//           })}
//           </Form.Select>
//         </Form.Group> */}
//         <Button variant="primary" type="submit">
//           Save Changes
//         </Button>
//       </Form>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateWorkout() {

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        let res = await fetch(`http://localhost:5001/workouts/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(workout)
        });
        navigate("/view");
    };

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

    if (foundWorkout === null) {
        return <p>Loading...</p>
    };

    return (
        <div>

            <h1>Update Workout Component</h1>

            <div>

                <form onSubmit={handleSubmit}>

                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        defaultValue={workout.name}
                        onChange={e => setWorkout({ ...workout, name: e.target.value })}
                        id="name"
                        name="name"
                    />

                    <br></br>

                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        defaultValue={workout.description}
                        onChange={e => setWorkout({ ...workout, description: e.target.value })}
                        id="description"
                        name="description"
                    />

                    <br></br>

                    <button type="submit">Submit</button>

                </form>

                <button onClick={() => navigate(-1)}>Back</button>

            </div>

        </div>
    );
};