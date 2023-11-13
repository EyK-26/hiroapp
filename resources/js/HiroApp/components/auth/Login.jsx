import React, { useState, useEffect, useContext } from "react";
import Context from "../../context/Context";
import axios from "axios";

export default function Login() {
    const { state, dispatch } = useContext(Context);
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("/login", values);
            const response_data = response.data;
            console.log(response_data);
            dispatch({
                type: "user/set",
                payload: response_data,
            });
            // dispatch({
            //     type: "success/add",
            //     payload: response_data,
            // });
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
                payload: error.response,
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

            <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
            />

            <button>Login</button>
        </form>
    );
}
