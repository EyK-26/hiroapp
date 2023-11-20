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
        <div
            className="notification_preview"
            key={notification.id}
            onClick={handleExpand.bind(null, notification)}
        >
            <span>From: {notification?.data.from}</span>
            <span>Subject: {notification?.data.subject}</span>
        </div>
    ));

    return (
        <>
            {isDetailsOpen && (
                <ShowMessage
                    notificationData={notificationData}
                    setIsDetailsOpen={setIsDetailsOpen}
                />
            )}
            {renderedNotifications}
        </>
    );
};

export default MessagePreview;
