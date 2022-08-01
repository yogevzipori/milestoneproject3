// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import Card from 'react-bootstrap/Card';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';

// export default function ViewWorkout() {

//   const navigate = useNavigate();

//   const deleteWorkout = async (id) => {
//     await fetch(`http://localhost:5001/workouts/delete/${id}`,{
//       method:"DELETE"
//     });
//   };

//   return (
//     <>
//     <div class="viewworkout">
//     <Card border="primary" style={{ width: '18rem' }}>
//       <Card.Header>Header</Card.Header>
//       <Card.Body>
//         <Card.Title>Primary Card Title</Card.Title>
//         <Card.Text>
//           Some quick example text to build on the card title and make up the
//           bulk of the card's content.
//         </Card.Text>
//         <DropdownButton id="dropdown-item-button" title="Dropdown button">
//       <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
//       <Dropdown.Item as="button">Action</Dropdown.Item>
//       <Dropdown.Item as="button">Another action</Dropdown.Item>
//       <Dropdown.Item as="button">Something else</Dropdown.Item>
//     </DropdownButton>
//       </Card.Body>
//     </Card>
//     <br />
//     <Card border="primary" style={{ width: '18rem' }}>
//       <Card.Header>Header</Card.Header>
//       <Card.Body>
//         <Card.Title>Secondary Card Title</Card.Title>
//         <Card.Text>
//           Some quick example text to build on the card title and make up the
//           bulk of the card's content.
//         </Card.Text>
//       </Card.Body>
//     </Card>
//     <br />
//     <Card border="primary" style={{ width: '18rem' }}>
//       <Card.Header>Header</Card.Header>
//       <Card.Body>
//         <Card.Title>Success Card Title</Card.Title>
//         <Card.Text>
//           Some quick example text to build on the card title and make up the
//           bulk of the card's content.
//         </Card.Text>
//       </Card.Body>
//     </Card>
//     <br />
//     <Card border="primary" style={{ width: '18rem' }}>
//       <Card.Header>Header</Card.Header>
//       <Card.Body>
//         <Card.Title>Danger Card Title</Card.Title>
//         <Card.Text>
//           Some quick example text to build on the card title and make up the
//           bulk of the card's content.
//         </Card.Text>
//       </Card.Body>
//     </Card>
//     <br />
//     <Card border="primary" style={{ width: '18rem' }}>
//       <Card.Header>Header</Card.Header>
//       <Card.Body>
//         <Card.Title>Warning Card Title</Card.Title>
//         <Card.Text>
//           Some quick example text to build on the card title and make up the
//           bulk of the card's content.
//         </Card.Text>
//       </Card.Body>
//     </Card>
//     <br />
//     <Card border="primary" style={{ width: '18rem' }}>
//       <Card.Header>Header</Card.Header>
//       <Card.Body>
//         <Card.Title>Info Card Title</Card.Title>
//         <Card.Text>
//           Some quick example text to build on the card title and make up the
//           bulk of the card's content.
//         </Card.Text>
//       </Card.Body>
//     </Card>
//     <br />
//     </div>
//   </>
// );
// }

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReadWorkout() {

    const navigate = useNavigate();

    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await fetch("http://localhost:5001/workouts");
                const json = await data.json();
                setWorkouts(json);
            } catch (err) {
                console.log(err);
            };
        };
        fetchUsers();
    }, []);

    const deleteWorkout = async (id) => {
        await fetch(`http://localhost:5001/workouts/${id}`, {
            method: "DELETE"
        });
    };

    return (
        <div>

            <h1>Read Workout Component</h1>

            <table>

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>

                <tbody>
                    {workouts.map((workout) => {
                        return (
                            <tr key={workout._id}>
                                <td>{workout.name}</td>
                                <td>{workout.description}</td>
                                <td>
                                    <button id="update" onClick={() => navigate(`/edit/${workout._id}`)}>Update</button>
                                </td>
                                <td>
                                    <button id="delete" onClick={() => {deleteWorkout(workout._id); window.location.reload(true)}}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>

            <button id="create" onClick={() => navigate("/add")}>Create Workout</button>

        </div>
    );
};