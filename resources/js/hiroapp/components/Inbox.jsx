import React, { useState } from "react";
import MessagePreview from "./MessagePreview";

const Inbox = ({ notifications }) => {
    const [isInboxOpen, setInboxOpen] = useState(false);

    const handleClick = () => {
        setInboxOpen((prev) => !prev);
    };

    return (
        <div className="inbox_preview">
            <div className="logo_with_number" onClick={handleClick}>
                Inbox({notifications.length})
            </div>
            {isInboxOpen && <MessagePreview notifications={notifications} />}
        </div>
    );
};

export default Inbox;
