import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
	const [hirings, setHirings] = useState([]);
	const [applicationsAmount, setApplicationsAmount] = useState(0);

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
			<h2>Your hirings</h2>

			{hirings.map((hiring) => (
				<Fragment key={hiring.id}>
					<Link to={"/positions/" + hiring.id}>
						<h4>{hiring.name}</h4>
					</Link>
					<p>{hiring.applications.length}</p>
					<p>Due: {hiring.start_date ? hiring.start_date : "Not determined"}</p>
				</Fragment>
			))}
		</>
	);
};

export default Home;
