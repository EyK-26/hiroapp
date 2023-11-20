import React from "react";

const ShowMessage = ({ notificationData, setIsDetailsOpen }) => {
    return (
        <>
            <div className="modal-overlay"></div>
            <div className="message">
                <div className="message-header">
                    <span>
                        Message sent at:{" "}
                        {notificationData.created_at
                            .split(/T|\./)
                            .slice(0, -1)
                            .join(" ")}
                    </span>
                    <span>From: {notificationData.data.from}</span>
                    <span>Subject: {notificationData.data.subject}</span>
                    {notificationData.read_at && (
                        <span>
                            Read at:{" "}
                            {notificationData.read_at
                                .split(/T|\./)
                                .slice(0, -1)
                                .join(" ")}
                        </span>
                    )}
                </div>
                <div className="message-body">
                    <span>{notificationData.data.text}</span>
                </div>
                <button
                    onClick={() => {
                        setIsDetailsOpen(false);
                    }}
                >
                    dismiss ←
                </button>
            </div>
        </>
    );
};

export default ShowMessage;
