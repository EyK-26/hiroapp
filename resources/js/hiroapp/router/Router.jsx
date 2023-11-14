import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import Login from "../components/auth/Login";
import Logout from "../components/auth/Logout";
import RecruiterHome from "../components/recruiter/Home";
import CandidateHome from "../components/candidate/Home";
import AdminHome from "../components/admin/Home";
import Context from "../context/Context";
import Unauthorized from "../components/Unauthorized";
import ApplicationDetail from "../components/candidate/ApplicationDetail";
import Applications from "../components/candidate/Applications";
import Positions from "../components/candidate/Positions";
import Position from "../components/candidate/Position";
import CreateApplication from "../components/candidate/CreateApplication";

const Router = ({ loadUserStatus }) => {
	const { state } = useContext(Context);

	const roleRoutes = () => {
		let role = "";
		switch (state.user?.role_id) {
			case 1:
				role = "admin";
				return <Route index element={<AdminHome />}></Route>;
			case 2:
				role = "candidate";
				return (
					<>
						<Route index element={<CandidateHome />} />
						<Route path="/applications" element={<Applications />} />
						<Route path="/positions" element={<Positions />} />
						<Route path="/apply/:id" element={<CreateApplication />} />
						<Route path="/positions/:id" element={<Position />} />
						<Route path="/applications/:id" element={<ApplicationDetail />} />
					</>
				);
			case 3:
				role = "recruiter";
				return <Route index element={<RecruiterHome />}></Route>;
			default:
				break;
		}
	};

	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				{roleRoutes()}
				<Route
					path="/login"
					element={<Login loadUserStatus={loadUserStatus} />}
				/>
				<Route path="/logout" element={<Logout />} />
				<Route path="*" element={<Unauthorized />} />
			</Route>
		</Routes>
	);
};

export default Router;
