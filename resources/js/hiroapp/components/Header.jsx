import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../context/Context";

const Header = () => {
    const { state } = useContext(Context);
    return (
        <header>
            <nav>
                {!state.user ? (
                    <Link to="/login">Login</Link>
                ) : (
                    <Link to="/logout">Logout</Link>
                )}
            </nav>
            {state.user ? (
                <span>Welcome {state.user.first_name}</span>
            ) : (
                "Loading"
            )}
        </header>
    );
};

export default Header;
