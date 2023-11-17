import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SeachBar";
import SelectDepartment from "./SelectDepartment";
import Pagination from "../Pagination";

const Users = () => {
	const [users, setUsers] = useState([]);
	const [search, setSearch] = useState("");
	const [department, setDepartment] = useState(0);
	const [page, setPage] = useState(1);
	const lastPage = Math.floor(users.length / 20);
	const startResults = 20 * (page - 1);

	const fetchUsers = async () => {
		try {
			const response = await axios.get(
				"/api/users?search=" + search + "&department=" + department
			);
			setUsers(response.data);
			console.log(response.data);
		} catch (error) {
			console.log(error.response.data);
		}
	};

	// const getDepartmentName = async (id) => {
	// 	const response = await axios.get("/api/users/" + id);
	// 	return response.department_name;
	// };

	useEffect(() => {
		fetchUsers();
		setPage(1);
	}, [search, department]);

	return (
		<>
			<h2>Users</h2>
			<div>
				<SearchBar subject="a user" setSearch={setSearch} />
				<SelectDepartment
					department={department}
					setDepartment={setDepartment}
				/>
			</div>
			{users.length > 20 && (
				<Pagination page={page} setPage={setPage} lastPage={lastPage} />
			)}

			<div>
				{users.slice(startResults, startResults + 20).map((user) => (
					<div key={user.id}>
						<Link to={"/users/" + user.id} key={user.id}>
							<span>
								{user.first_name} {user.last_name}
							</span>
						</Link>
						<span> {user.position?.name} </span>
						<span>{user.role.name} </span>
						{/* <span>how to get a department name here?</span> */}
					</div>
				))}
			</div>
		</>
	);
};

export default Users;
