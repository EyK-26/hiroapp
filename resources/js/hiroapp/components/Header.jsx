import React, { useContext, useEffect, useState } from "react";
import Context from "../context/Context";
import UserProfile from "./UserProfile";
import Navigation from "./Navigation";

const Header = () => {
    const { state } = useContext(Context);
    const [showProfile, setShowProfile] = useState(false);

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };

    useEffect(() => {
        setShowProfile(false);
    }, [state.user]);

    return (
        <header className="Header">
            <span className="page_titlex">HiroApp</span>
            <Navigation />
            {state.user && (
                <a className="profile" onClick={toggleProfile}>
                    Profile
                </a>
            )}
            {showProfile && <UserProfile />}
        </header>
    );
};

export default Header;
