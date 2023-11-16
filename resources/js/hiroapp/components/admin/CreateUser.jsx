import React, { useState } from "react";

const CreateUser = () => {
	const [values, setValues] = useState({
		first_name: "",
		last_name: "",
		email: "",
		role_id: "",
	});

	const fetchPositions = async () => {
		try {
			const response = await axios.get("/api/positions/all");
			setPositions(response.data);
		} catch (error) {
			console.log(error.response.data);
		}
	};

	const handleSubmit = (ev) => {
		ev.preventDefault();
	};

	const handleChange = (ev) => {
		setValues((previous_values) => {
			return {
				...previous_values,
				[ev.target.name]: ev.target.value,
			};
		});
	};

	return (
		<>
			<h2>Create new user</h2>
			<form action="/" method="post" onSubmit={handleSubmit}></form>
			<label htmlFor="first_name">
				First name:
				<br />
				<input
					type="text"
					name="first_name"
					onChange={handleChange}
					value={values.first_name}
					required
				/>
			</label>
			<br />
			<label htmlFor="last_name">
				Last name:
				<br />
				<input
					type="text"
					name="last_name"
					onChange={handleChange}
					value={values.last_name}
					required
				/>
			</label>
			<br />
			<label htmlFor="position">
				Position:
				<br />
				<select
					name="position"
					onChange={handleChange}
					value={values.position}
					required
				>
					<option value="" disabled>
						Select the position
					</option>
					{positions
						? positions.map((position) => (
								<option key={position.name} value={position.name}>
									{position.name}
								</option>
						  ))
						: "Loading positions..."}
				</select>
			</label>
			<label>
				Role: <br />
				<select
					name="role_id"
					onChange={handleChange}
					value={values.role_id}
					required
				>
					<option value="" disabled>
						Select the role
					</option>
					<option value={1}>Admin</option>
					<option value={2}>Candidate</option>
					<option value={3}>Recruiter</option>
				</select>
			</label>
		</>
	);
};

export default CreateUser;
