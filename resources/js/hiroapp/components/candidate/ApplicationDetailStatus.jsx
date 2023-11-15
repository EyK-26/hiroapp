import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Context from "../../context/Context";
import InterviewForm from "../recruiter/InterviewForm";

const ApplicationDetailStatus = ({
    applicationStatus,
    setIsEnded,
    setMoveCount,
    applicant,
    position,
}) => {
    const { allStatuses, currentStatus, applicationId } = applicationStatus;
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isInterviewPopupOpen, setIsInterviewPopupOpen] = useState(null);
    const [isInterviewSet, setIsInterviewSet] = useState(false);
    const { state } = useContext(Context);

    const handleClick = () => {
        setIsPopupOpen(true);
    };

    const handleCancel = () => {
        setIsPopupOpen(false);
    };

    const handleMove = async () => {
        console.log(1);
        console.log(isInterviewSet);
        if (currentStatus.id === 2 && !isInterviewSet) {
            console.log(2);
            setIsInterviewPopupOpen(true);
            console.log(isInterviewSet);
            return;
        } else if (currentStatus.id !== 2 || isInterviewSet) {
            console.log(3);
            console.log(isInterviewSet);
            try {
                const response = await axios.post(
                    `/api/applications/${applicationId}/move`
                );
                setMoveCount((prev) => prev + 1);
            } catch (err) {
                console.log(err.response);
            }
        }
    };

    const handleEnd = async () => {
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

    useEffect(() => {
        if (isInterviewPopupOpen !== null) {
            handleMove();
        }
    }, [isInterviewSet]);

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
                <button onClick={handleClick}>
                    {state.user.role_id === 2
                        ? "Retrieve Your Application"
                        : "Reject"}
                </button>
            )}
            {isPopupOpen && (
                <div className="warning_retrieve">
                    <span>
                        {state.user.role_id === 2
                            ? "Are you sure you want to retrieve your application? Do not worry, retrieving does not prevent you from applying again."
                            : "Reject the candidate? Once rejected, you won't be able to revert it."}
                    </span>
                    <button onClick={handleEnd}>Confirm</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}
            {currentStatus.id === 2 && isInterviewPopupOpen && (
                <div className="invitation_interview">
                    <InterviewForm
                        applicant={applicant}
                        position={position}
                        setIsInterviewPopupOpen={setIsInterviewPopupOpen}
                        setIsInterviewSet={setIsInterviewSet}
                    />
                </div>
            )}
            <ul>{renderedAllStatuses}</ul>
        </div>
    );
};

export default ApplicationDetailStatus;
