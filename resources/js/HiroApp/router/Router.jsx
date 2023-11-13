import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import Login from "../components/auth/Login";
import Logout from "../components/auth/Logout";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="*" element="404 page not found" />
            </Route>
        </Routes>
    );
};

export default Router;
