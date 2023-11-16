import React, { useContext, useState } from "react";
import Context from "../../context/Context";
import axios from "axios";

const InterviewForm = ({
    applicant,
    position,
    setIsInterviewPopupOpen,
    setIsInterviewSet,
}) => {
    const { state } = useContext(Context);

    const defaultText = `Dear ${applicant.first_name}, 

        We would like to invite you to the position of ${position.name}. 
        Kindly find the time and the place of the interview below. 
        If you cannot join the interview or would like to change the date, please notify me via Slack or Email.
        Regards ${state.user.first_name} ${state.user.last_name}`;

    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
        const day = String(now.getDate()).padStart(2, "0");
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const [values, setValues] = useState({
        text: defaultText,
        place: "",
        datetime: getCurrentDateTime(),
    });

    const handleChange = (ev) => {
        setValues((prev) => ({
            ...prev,
            [ev.target.name]: ev.target.value,
        }));
    };

    const sendInvitation = async (ev) => {
        ev.preventDefault();
        setIsInterviewSet(true);
        setIsInterviewPopupOpen(false);
        try {
            const response = axios.post("/api/applications/notify", {
                ...values,
                applicant_id: applicant.id,
                sender: state.user.email,
            });
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const cancelInvitation = () => {
        setIsInterviewPopupOpen(false);
    };

    return (
        <>
            <form action="/applications/notify" method="post">
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
                <button type="submit" onClick={sendInvitation}>
                    Confirm
                </button>
                <button onClick={cancelInvitation}>Cancel</button>
            </form>
        </>
    );
};

export default InterviewForm;
