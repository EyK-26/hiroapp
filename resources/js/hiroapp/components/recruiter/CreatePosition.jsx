import axios from "axios";
import React, { useEffect, useState } from "react";

const CreatePosition = () => {
	const [positions, setPositions] = useState(null);
	const [values, setValues] = useState({
		name: "",
		description: "",
		start_date: "",
		end_date: "",
		pay_grade: "",
	});

	const fetchPositions = async () => {
		try {
			const response = await axios.get("/api/positions/all");
			setPositions(response.data);
		} catch (error) {
			console.log(error.response.data);
		}
	};

	const handleChange = (ev) => {
		setValues((previous_values) => {
			return {
				...previous_values,
				[ev.target.name]: ev.target.value,
			};
		});
	};

	useEffect(() => {
		fetchPositions();
	}, []);

	return (
		<>
			<h2>Create new position</h2>
			<form
				action="/login"
				method="post"
				// onSubmit={handleSubmit}
			>
				<br />
				<label>
					Name:
					<br />
					<select name="name" onChange={handleChange}>
						{positions
							? positions.map((position) => (
									<option key={position.name} value={values.name}>
										{position.name}
									</option>
							  ))
							: "Loading positions..."}
					</select>
				</label>
				<br />
				Description: <br />
				<textarea
					name="description"
					value={values.description}
					onChange={handleChange}
				/>
				<br />
				Start date: <br />
				<input
					type="date"
					name="start_date"
					value={values.start_date}
					onChange={handleChange}
				/>
				<br />
				End date: <br />
				<input
					type="date"
					name="end_date"
					value={values.end_date}
					onChange={handleChange}
				/>
				<br />
				<label>
					Pay grade: <br />
					<select name="pay_grade" onChange={handleChange}>
						<option value={values.pay_grade}>1</option>
						<option value={values.pay_grade}>2</option>
						<option value={values.pay_grade}>3</option>
					</select>
				</label>
				<br />
				<button>Create</button>
			</form>
		</>
	);
};

export default CreatePosition;
