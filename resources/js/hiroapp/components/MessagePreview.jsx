import React, { useState } from "react";
import ShowMessage from "./ShowMessage";

const MessagePreview = ({ notifications }) => {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [notificationData, setNotificationData] = useState(null);

    const handleExpand = (data) => {
        setIsDetailsOpen(true);
        setNotificationData(data);
    };

    const renderedNotifications = notifications.map((notification) => (
        <div
            key={notification.id}
            onClick={handleExpand.bind(null, notification)}
        >
            <ul>
                <li>From: {notification?.data.from}</li>
                <li>Subject: {notification?.data.subject}</li>
            </ul>
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
