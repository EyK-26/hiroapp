import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../context/Context";

const Header = () => {
    const { state } = useContext(Context);
    console.log(state.user);
    return (
        <header>
            <nav>
                <Link to="/login">Login</Link>
                <Link to="/logout">Logout</Link>
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
