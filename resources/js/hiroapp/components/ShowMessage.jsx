import React from "react";

const ShowMessage = ({ notificationData, setIsDetailsOpen }) => {
    return (
        <div>
            <ul>
                <li>
                    Message Sent At:
                    {notificationData.created_at
                        .split(/T|\./)
                        .slice(0, -1)
                        .join(" ")}
                </li>
                <li>From: {notificationData.data.from}</li>
                <li>Subject: {notificationData.data.subject}</li>
                <li>{notificationData.data.text}</li>
                <button
                    onClick={() => {
                        setIsDetailsOpen(false);
                    }}
                >
                    dismiss
                </button>
            </ul>
        </div>
    );
};

export default ShowMessage;
