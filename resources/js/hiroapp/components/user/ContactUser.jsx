import React, { useContext, useState } from "react";
import Context from "../../context/Context";
import axios from "axios";

const ContactUser = ({ userData, setIsEmailPopupOpen }) => {
    // const { state } = useContext(Context);
    // const { input, setInput } = useState({
    //     to: userData.email,
    //     from: state.user.email,
    //     text: "",
    // });

    // const handleChange = (ev) => {
    //     setInput((previous_values) => {
    //         return {
    //             ...previous_values,
    //             [ev.target.name]: ev.target.value,
    //         };
    //     });
    // };

    // const handleSend = async () => {
    //     try {
    //         const response = await axios.post(`/api/notify`, {
    //             input,
    //         });
    //         if (Math.floor(response.status / 100) === 2) {
    //             console.log("dssa");
    //         }
    //     } catch (err) {
    //         console.log(err.response);
    //     }
    //     setIsEmailPopupOpen(false);
    // };

    // const handleDiscard = () => {
    //     setIsEmailPopupOpen(false);
    // };

    return (
        <>
            {/* <form action="/">
                <label htmlFor="to">To</label>
                <input type="email" id="to" value={input.to} disabled />
                <label htmlFor="from">To</label>
                <input type="email" id="from" value={input.from} disabled />
                <textarea
                    name="text"
                    id="text"
                    cols="40"
                    rows="20"
                    onChange={handleChange}
                    value={input.text}
                />
                <button onClick={handleSend}>Send</button>
                <button onClick={handleDiscard}>Discard</button>
            </form> */}
            contact
        </>
    );
};

export default ContactUser;
