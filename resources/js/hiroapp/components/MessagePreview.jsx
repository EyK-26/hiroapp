import React, { useState } from "react";
import ShowMessage from "./ShowMessage";
import axios from "axios";

const MessagePreview = ({ notifications, setReadCount }) => {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [notificationData, setNotificationData] = useState(null);

    const markAsRead = async (id) => {
        try {
            const response = await axios.post("/api/notify/markasread", { id });
            if (response.data.message === "success") {
                setReadCount((prev) => prev + 1);
            }
        } catch (err) {
            console.log(err.response);
        }
    };

    const handleExpand = (data) => {
        markAsRead(data.id);
        setIsDetailsOpen(true);
        setNotificationData(data);
    };

    const renderedNotifications = notifications.map((notification) => (
        <div key={notification.id}>
            <ul>
                <li>From: {notification?.data.from}</li>
                <li>Subject: {notification?.data.subject}</li>
            </ul>
            {!isDetailsOpen && (
                <button onClick={handleExpand.bind(null, notification)}>
                    Open ↓
                </button>
            )}
        </div>
    ));

    return (
        <div>
            <div>{renderedNotifications}</div>
            <div>
                {isDetailsOpen && (
                    <ShowMessage
                        notificationData={notificationData}
                        setIsDetailsOpen={setIsDetailsOpen}
                    />
                )}
            </div>
        </div>
    );
};

export default MessagePreview;
