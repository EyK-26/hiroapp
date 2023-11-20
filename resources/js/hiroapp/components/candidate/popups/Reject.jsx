import React, { useContext } from "react";
import Context from "../../../context/Context";

const Reject = ({ setIsProcessingQuery, setIsRejectPopupOpen, handleEnd }) => {
    const { state } = useContext(Context);
    return (
        <div className="warning_retrieve">
            <span>
                {state.user.role_id === 2
                    ? "Are you sure you want to retrieve your application? Do not worry, retrieving does not prevent you from applying again."
                    : "Reject the candidate? Once rejected, you won't be able to revert it."}
            </span>
            <button
                onClick={() => {
                    setIsProcessingQuery(true);
                    handleEnd();
                }}
            >
                Confirm
            </button>
            <button onClick={() => setIsRejectPopupOpen(false)}>Cancel</button>
        </div>
    );
};

export default Reject;
