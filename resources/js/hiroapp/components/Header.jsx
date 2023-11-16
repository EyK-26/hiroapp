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
        <header>
            <span>HiroApp</span>
            <div>
                {state.user && (
                    <span onClick={toggleProfile}>{state.user.first_name}</span>
                )}
                {showProfile && <UserProfile />}
                <Navigation />
            </div>
        </header>
    );
};

export default Header;
