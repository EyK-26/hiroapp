import React, { useContext } from "react";
import Logout from "./auth/Logout";
import Context from "../context/Context";

const UserProfile = () => {
    const { state } = useContext(Context);

    return (
        <div>
            <span>
                {state.user?.first_name} {state.user?.last_name}
            </span>
            <br />
            <span>{state.user?.email}</span>
            <br />
            <Logout />
        </div>
    );
};

export default UserProfile;
