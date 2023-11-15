import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CreateApplication = () => {
    const { id } = useParams();
    const [values, setValues] = useState({
        attachment_text: "",
        attachment_file: "",
        position_id: id,
    });
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("/api/applications", values);
            navigate("/");
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const handleChange = (event) => {
        setValues((previous_values) => {
            return {
                ...previous_values,
                [event.target.name]: event.target.value,
            };
        });
    };
    //login to remove from form action
    return (
        <>
            <form action="/login" method="post" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="attachment_text"
                    value={values.attachment_text}
                    onChange={handleChange}
                />

                <input
                    type="url"
                    name="attachment_file"
                    value={values.attachment_file}
                    onChange={handleChange}
                />

                <button>Apply</button>
            </form>
        </>
    );
};

export default CreateApplication;
