import React, { useContext } from "react";
import Logout from "./auth/Logout";
import Context from "../context/Context";
import Inbox from "./Inbox";

const UserProfile = () => {
    const { state } = useContext(Context);

    return (
        <div>
            <span>
                {state.user?.first_name} {state.user?.last_name}
            </span>
            <span>{state.user?.email}</span>
            <span>{state.user?.position?.name}</span>
            {state.user?.notifications?.length > 0 ? (
                <Inbox notifications={state.user?.notifications} />
            ) : (
                "Your Inbox is Empty"
            )}
            <Logout />
        </div>
    );
};

export default UserProfile;
