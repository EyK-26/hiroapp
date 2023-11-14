import axios from "axios";
import React, { useContext, useState } from "react";
import Context from "../../context/Context";

const ApplicationDetailStatus = ({
    applicationStatus,
    setIsEnded,
    setMoveCount,
}) => {
    const { allStatuses, currentStatus, applicationId } = applicationStatus;
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { state } = useContext(Context);

    const handleClick = () => {
        setIsPopupOpen(true);
    };

    const handleCancel = () => {
        setIsPopupOpen(false);
    };

    const handleMove = async () => {
        try {
            const response = await axios.post(
                `/api/applications/${applicationId}/move`
            );
            setMoveCount((prev) => prev + 1);
        } catch (err) {
            console.log(err.response);
        }
    };

    const handleConfirm = async () => {
        try {
            const response = await axios.post(
                `/api/applications/${applicationId}/end`
            );
            setIsEnded(true);
            setIsPopupOpen(false);
        } catch (err) {
            console.log(err.response);
        }
    };

    const temporaryStyle = { backgroundColor: "green" };
    const renderedAllStatuses = allStatuses.map((status) => (
        <li
            key={status.id}
            style={status.id === currentStatus.id ? temporaryStyle : null}
        >
            {status.name}
            {status.id === currentStatus.id &&
                currentStatus.id !== 6 &&
                state.user.role_id !== 2 && (
                    <button onClick={handleMove}>Move To Next Stage</button>
                )}
        </li>
    ));

    return (
        <div>
            {currentStatus.id !== 6 && (
                <button onClick={handleClick}>Retrieve</button>
            )}
            {isPopupOpen && (
                <div className="warning_retrieve">
                    <span>
                        {state.user.role_id === 2
                            ? "Are you sure you want to retrieve your application? Do not worry, retrieving does not prevent you from applying again."
                            : "Reject the candidate? Once rejected, you won't be able to revert it."}
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
