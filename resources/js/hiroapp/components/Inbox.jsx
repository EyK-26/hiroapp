import React, { useEffect, useState } from "react";
import MessagePreview from "./MessagePreview";
import axios from "axios";

const Inbox = ({ notifications }) => {
    const [isInboxOpen, setInboxOpen] = useState(false);
    const [unreadMsgCount, setUnreadMsgCount] = useState(0);
    const [readCount, setReadCount] = useState(0);

    const getUnreadMsgCount = async () => {
        try {
            const response = await axios.get("/api/notify/get");
            setUnreadMsgCount(response.data);
        } catch (err) {
            console.log(err.response);
        }
    };

    const handleClick = () => {
        setInboxOpen((prev) => !prev);
    };

    useEffect(() => {
        getUnreadMsgCount();
    }, [readCount]);

    return (
        <div className="inbox_preview">
            <div className="logo_with_number" onClick={handleClick}>
                Inbox: {unreadMsgCount > 0 && unreadMsgCount}
            </div>
            {isInboxOpen && (
                <MessagePreview
                    notifications={notifications}
                    setReadCount={setReadCount}
                />
            )}
        </div>
    );
};

export default Inbox;
