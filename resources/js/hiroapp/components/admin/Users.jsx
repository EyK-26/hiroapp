import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SeachBar";

const Users = () => {
	const [users, setUsers] = useState([]);
	const [search, setSearch] = useState("");

	const fetchUsers = async () => {
		const response = await axios.get("/api/users");
		setUsers(response.data);
		console.log(response.data);
	};

	// const getDepartmentName = async (id) => {
	// 	const response = await axios.get("/api/users/" + id);
	// 	return response.department_name;
	// };

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
			<div>
				<SearchBar subject="a user" setSearch={setSearch} />
			</div>
			{users.map((user) => (
				<div key={user.id}>
					<Link to={"/users/" + user.id} key={user.id}>
						<span>
							{user.first_name} {user.last_name}
						</span>
					</Link>
					<span> {user.position?.name} </span>
					<span>{user.role.name} </span>
					{/* <span>how to get a department name here?</span> */}
					<button onClick={() => handleDelete(user.id)}>Delete user</button>
				</div>
			))}
		</>
	);
};

export default Users;
