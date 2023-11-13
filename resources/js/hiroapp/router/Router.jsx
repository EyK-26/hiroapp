import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import Login from "../components/auth/Login";
import Logout from "../components/auth/Logout";
import Home from "../components/Home";

const Router = ({ loadUserStatus }) => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
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
