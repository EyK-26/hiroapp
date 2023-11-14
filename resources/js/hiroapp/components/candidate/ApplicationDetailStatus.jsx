import axios from "axios";
import React, { useState } from "react";

const ApplicationDetailStatus = ({
    applicationStatus,
    setIsEndedByCandidate,
    isEndedByCandidate,
}) => {
    const { allStatuses, currentStatus, applicationId } = applicationStatus;
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const temporaryStyle = { backgroundColor: "green" };
    const renderedAllStatuses = allStatuses.map((status) => (
        <li
            key={status.id}
            style={status.id === currentStatus.id ? temporaryStyle : null}
        >
            {status.name}
        </li>
    ));

    const handleClick = () => {
        setIsPopupOpen(true);
    };

    const handleCancel = () => {
        setIsPopupOpen(false);
    };

    const handleConfirm = async () => {
        try {
            const response = await axios.post(
                `/api/applications/${applicationId}/edit`
            );
            setIsEndedByCandidate(true);
            setIsPopupOpen(false);
        } catch (err) {
            console.log(err.response);
        }
    };

    return (
        <div>
            {currentStatus.id !== 6 && (
                <button onClick={handleClick}>Retrieve Your Application</button>
            )}
            {isPopupOpen && (
                <div className="warning_retrieve">
                    <span>
                        Are you sure you want to retrieve your application? Do
                        not worry, retrieving does not prevent you from applying
                        again.
                    </span>
                    <button onClick={handleConfirm}>Confirm</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}
            <ul>{renderedAllStatuses}</ul>
        </div>
    );
};

export default ApplicationDetailStatus;
