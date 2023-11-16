import React, { useContext } from "react";
import Context from "../context/Context";
import { Link } from "react-router-dom";

const Navigation = () => {
    const { state } = useContext(Context);
    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                {state.user?.role_id === 1 && (
                    <Link to="/users/create">Create New User</Link>
                )}
                {state.user?.role_id === 2 && (
                    <>
                        <Link to="/applications">Your Applications</Link>
                        <Link to="/positions">Positions</Link>
                    </>
                )}
                {state.user?.role_id === 3 && (
                    <>
                        <Link to="/position/create">Create New Position</Link>
                    </>
                )}
            </nav>
        </>
    );
};

export default Navigation;
