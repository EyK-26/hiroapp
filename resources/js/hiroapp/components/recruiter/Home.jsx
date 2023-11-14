import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
	const [hirings, setHirings] = useState([]);

	const fetchHirings = async () => {
		try {
			const response = await axios.get("/api/positions");
			setHirings(response.data);
			console.log(response.data);
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
			<ul>
				{hirings.map((hiring) => (
					<li key={hiring.id}>
						<Link to={"/positions/" + hiring.id}>
							<h5>{hiring.name}</h5>
						</Link>
						<p>()</p>
						<p>
							Due: {hiring.start_date ? hiring.start_date : "Not determined"}
						</p>
					</li>
				))}
			</ul>
		</>
	);
};

export default Home;
