import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
	const [hirings, setHirings] = useState([]);

	const fetchHirings = async () => {
		try {
			const response = await axios.get("/api/positions");
			setHirings(response.data);
		} catch (error) {
			console.log("UNKNOWN ERROR", error.response.data);
		}
	};

	useEffect(() => {
		fetchHirings();
	}, []);

	return (
		<>
			<h1>Welcome Recruiter</h1>
			<div style={{ display: "flex" }}>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<h2>Your hirings</h2>

					<div>
						{hirings.map((hiring) => (
							<Fragment key={hiring.id}>
								<Link to={"/positions/" + hiring.id}>
									<h4>{hiring.name}</h4>
								</Link>
								<p>{hiring.applications.length}</p>
								<p>
									Due:{" "}
									{hiring.start_date ? hiring.start_date : "Not determined"}
								</p>
							</Fragment>
						))}
					</div>
				</div>
				<div>
					<h2>Create new position</h2>
					<form
						action="/login"
						method="post"
						// onSubmit={handleSubmit}
					>
						<br />
						Name:
						<br />
						<input
							type="text"
							name="name"
							// value={values.attachment_text}
							// onChange={handleChange}
						/>
						<br />
						Description: <br />
						<textarea
							name="description"
							// value={values.attachment_file}
							// onChange={handleChange}
						/>
						<br />
						Start date: <br />
						<input
							type="date"
							name="start_date"
							// value={values.attachment_file}
							// onChange={handleChange}
						/>
						<br />
						End date: <br />
						<input
							type="date"
							name="end_date"
							// value={values.attachment_file}
							// onChange={handleChange}
						/>
						<br />
						Pay grade: <br />
						<input
							type="number"
							name="pay_grade"
							// value={values.attachment_file}
							// onChange={handleChange}
						/>
						<br />
						<button>Create</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default Home;
