import axios from "axios";
import React, { useEffect, useState } from "react";

const Users = () => {
	const [users, setUsers] = useState([]);

	const fetchUsers = async () => {
		const response = await axios.get("/api/users");
		setUsers(response.data);
		console.log(response.data);
	};

	const handleDelete = async (id) => {
		console.log(id);
		try {
			const response = await axios.post("/api/users/" + id + "/delete");
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<>
			<h2>Users</h2>
			{users.map((user) => (
				<div key={user.id}>
					<span>
						{user.first_name} {user.last_name}
					</span>
					<span> {user.position?.name} </span>
					<span>{user.role.name} </span>
					{/* <span>{user.position.department.name}</span> */}
					<button onClick={() => handleDelete(user.id)}>Delete user</button>
				</div>
			))}
		</>
	);
};

export default Users;
