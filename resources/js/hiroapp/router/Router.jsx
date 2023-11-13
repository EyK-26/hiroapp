import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import Login from "../components/auth/Login";
import Logout from "../components/auth/Logout";
import Home from "../components/Home";
import RecruiterHome from "../components/recruiter/Home";
import CandidateHome from "../components/candidate/Home";
import AdminHome from "../components/admin/Home";

const Router = ({ loadUserStatus }) => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/recruiter" element={<RecruiterHome />}></Route>
                <Route path="/candidate" element={<CandidateHome />}></Route>
                <Route path="/admin" element={<AdminHome />}></Route>
                <Route
                    path="/login"
                    element={<Login loadUserStatus={loadUserStatus} />}
                />
                <Route path="/logout" element={<Logout />} />
                <Route path="*" element="404 page not found" />
            </Route>
        </Routes>
    );
};

export default Router;
