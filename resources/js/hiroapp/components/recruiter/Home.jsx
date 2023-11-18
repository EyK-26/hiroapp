import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <h1>Welcome Recruiter</h1>
            <div>
                <Link to="/hirings">Your hirings</Link>
                <Link to="/position/create">Create a Position</Link>
            </div>
        </>
    );
};

export default Home;
