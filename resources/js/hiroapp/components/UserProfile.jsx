import React, { useContext } from "react";
import Logout from "./auth/Logout";
import Context from "../context/Context";
import Inbox from "./Inbox";

const UserProfile = () => {
    const { state } = useContext(Context);

    return (
        <div className="UserProfile">
            <span className="username">
                {state.user?.first_name} {state.user?.last_name}
            </span>
            <span className="department">
                {state.user?.position?.department?.name}
            </span>
            {state.user?.notifications?.length > 0 ? (
                <Inbox />
            ) : (
                "Your Inbox is Empty"
            )}
            <Logout />
        </div>
    );
};

export default UserProfile;
