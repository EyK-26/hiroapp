import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Context from "../../context/Context";
import InterviewForm from "../recruiter/InterviewForm";

const ApplicationDetailStatus = ({
    allStatuses,
    application,
    setIsEnded,
    setMoveCount,
}) => {
    const [isRejectPopupOpen, setIsRejectPopupOpen] = useState(false);
    const [isInterviewPopupOpen, setIsInterviewPopupOpen] = useState(null);
    const [isHirePopupOpen, setIsHirePopupOpen] = useState(false);
    const [isInterviewSet, setIsInterviewSet] = useState(false);
    const { state } = useContext(Context);

    const handleMove = async () => {
        if (application.status.id === 2 && !isInterviewSet) {
            setIsInterviewPopupOpen(true);
            return;
        } else if (application.status.id !== 2 || isInterviewSet) {
            try {
                const response = await axios.post(
                    `/api/applications/${application.id}/move`
                );
                setMoveCount((prev) => prev + 1);
                setIsHirePopupOpen(false);
            } catch (err) {
                console.log(err.response);
            }
        }
    };

    const handleEnd = async () => {
        try {
            const response = await axios.post(
                `/api/applications/${application.id}/end`
            );
            setIsEnded(true);
            setIsRejectPopupOpen(false);
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
    const renderedAllStatuses = allStatuses.map((status) => {
        const isCurrent =
            status.id === application.status.id && state.user.role_id !== 2;
        const renderMoveBtn = isCurrent && application.status.id < 4;
        const renderHireBtn = isCurrent && application.status.id === 4;

        return (
            <li
                key={status.id}
                style={
                    status.id === application.status.id ? temporaryStyle : null
                }
            >
                {status.name}
                {isCurrent &&
                    (renderMoveBtn ? (
                        <button onClick={handleMove}>Move To Next Stage</button>
                    ) : (
                        renderHireBtn && (
                            <button onClick={() => setIsHirePopupOpen(true)}>
                                Hire
                            </button>
                        )
                    ))}
            </li>
        );
    });

    return (
        <div>
            {application.status.id < 5 && (
                <button onClick={() => setIsRejectPopupOpen(true)}>
                    {state.user.role_id === 2
                        ? "Retrieve Your Application"
                        : "Reject"}
                </button>
            )}
            {isRejectPopupOpen && (
                <div className="warning_retrieve">
                    <span>
                        {state.user.role_id === 2
                            ? "Are you sure you want to retrieve your application? Do not worry, retrieving does not prevent you from applying again."
                            : "Reject the candidate? Once rejected, you won't be able to revert it."}
                    </span>
                    <button onClick={handleEnd}>Confirm</button>
                    <button onClick={() => setIsRejectPopupOpen(false)}>
                        Cancel
                    </button>
                </div>
            )}
            {isHirePopupOpen && (
                <div className="warning_hire">
                    <span>
                        {`Dear ${state.user.first_name}, You are about to hire ${application.user.first_name} ${application.user.last_name} for the position of ${application.position.name}.
                        By clicking confirm a hiring confirmation email will be sent to applicant.`}
                    </span>
                    <button onClick={handleMove}>Confirm</button>
                    <button onClick={() => setIsHirePopupOpen(false)}>
                        Cancel
                    </button>
                </div>
            )}
            {application.status.id === 2 && isInterviewPopupOpen && (
                <div className="invitation_interview">
                    <InterviewForm
                        applicant={application.user}
                        position={application.position}
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
