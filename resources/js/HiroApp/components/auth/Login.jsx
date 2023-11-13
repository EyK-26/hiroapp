import React, { useState, useEffect, useContext } from "react";
import Context from "../../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { state, dispatch } = useContext(Context);
    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("/login", values);
            const response_data = response.data;
            dispatch({
                type: "success/add",
                payload: response.statusText,
            });
            navigate("/");
        } catch (error) {
            switch (error.response) {
                case 422:
                    console.log(
                        "VALIDATION FAILED:",
                        error.response.data.errors
                    );
                    break;
                case 500:
                    console.log("UNKNOWN ERROR", error.response.data);
                    break;
            }
            dispatch({
                type: "error/add",
                payload: error.response.data.errors,
            });
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

    return (
        <form action="/login" method="post" onSubmit={handleSubmit}>
            <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
            />
            {state.messages.errors?.email && (
                <span>{state.messages.errors.email}</span>
            )}

            <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
            />
            {state.messages.errors?.password && (
                <span>{state.messages.errors.password}</span>
            )}

            <button>Login</button>
        </form>
    );
}
