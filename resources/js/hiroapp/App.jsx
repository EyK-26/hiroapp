import React, { useContext, useEffect, useReducer } from "react";
import reducer from "./store/Reducer";
import { BrowserRouter, useNavigate } from "react-router-dom";
import Context from "./context/Context";
import Router from "./router/Router";
import axios from "axios";

const App = () => {
    const { state, dispatch } = useContext(Context);
    const navigate = useNavigate();

    const loadUserStatus = async () => {
        try {
            const response = await axios.get("/api/user");
            if (response.status == 200) {
                console.log(response.data);
                dispatch({
                    type: "user/set",
                    payload: response.data,
                });
            } else if (response.status == 401) {
                dispatch({
                    type: "user/set",
                    payload: false,
                });
                navigate("/login");
            }
        } catch (error) {
            dispatch({
                type: "error/add",
                payload: error.response?.data.errors,
            });
            dispatch({
                type: "user/set",
                payload: null,
            });
            navigate("/login");
        }
    };

    useEffect(() => {
        if (state.user === null) {
            loadUserStatus();
        }
    }, [state.user]);

    return <Router />;
};
export default App;
