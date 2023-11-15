import React, { useContext, useState } from "react";
import Context from "../../context/Context";

const InterviewForm = ({
    applicant,
    position,
    setIsInterviewPopupOpen,
    setIsInterviewSet,
}) => {
    const { state } = useContext(Context);
    const [values, setValues] = useState({
        text: "",
        place: "",
        datetime: "",
    });

    const handleChange = (ev) => {
        setValues((prev) => ({
            ...prev,
            [ev.target.name]: ev.target.value,
        }));
    };

    const confirmInterview = () => {
        setIsInterviewSet(true);
        setIsInterviewPopupOpen(false);
    };
    const cancelInterview = () => {
        setIsInterviewPopupOpen(false);
    };

    const handleSubmit = () => {
        console.log("triggered");
    };

    const defaultText = `Dear ${applicant.first_name}, 
        We would like to invite you to the position of ${position.name}. 
        Kindly find the time and the place of the interview below. 
        If you cannot join the interview or would like to change the date, please notify me via Slack or Email.
        Regards ${state.user.first_name} ${state.user.last_name}`;

    return (
        <>
            <form action="" method="post" onSubmit={handleSubmit}>
                <label htmlFor="text">Your invitation text goes here:</label>
                <textarea
                    name="text"
                    id="text"
                    cols="30"
                    rows="10"
                    defaultValue={defaultText}
                    onChange={handleChange}
                ></textarea>
                <label htmlFor="datetime">Please choose a date</label>
                <input
                    type="datetime-local"
                    name="datetime"
                    value={values.datetime}
                    onChange={handleChange}
                />
                <label htmlFor="place">Select a meeting room</label>
                <select
                    name="place"
                    value={values.place}
                    onChange={handleChange}
                >
                    <option value="">Please select a room</option>
                    <option value="Green Room">Green Room</option>
                    <option value="Blue Room">Blue Room</option>
                    <option value="Orange Room">Orange Room</option>
                    <option value="Red Rum">Red Rum</option>
                    <option value="Dark Room">Dark Room</option>
                </select>
                <div className="warning_invitation">
                    <button onClick={confirmInterview}>Confirm</button>
                    <button onClick={cancelInterview}>Cancel</button>
                </div>
            </form>
        </>
    );
};

export default InterviewForm;
