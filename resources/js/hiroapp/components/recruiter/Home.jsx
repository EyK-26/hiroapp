import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";

const Home = () => {
    const [toggleDashboard, setToggleDashboard] = useState(false);

    return (
        <>
            <h1>Welcome Recruiter</h1>
            <div>
                <span
                    onClick={() => {
                        setToggleDashboard((prev) => !prev);
                    }}
                >
                    Click to Toggle Dashboard
                </span>
                {toggleDashboard && <Dashboard />}
                <Link to="/hirings">Your hirings</Link>
                <Link to="/position/create">Create a Position</Link>
            </div>
        </>
    );
};

export default Home;
