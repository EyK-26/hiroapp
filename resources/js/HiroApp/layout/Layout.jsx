import React, { useContext, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import Context from "../context/Context";
import axios from "axios";

const Layout = () => {
    const { state, dispatch } = useContext(Context);
    const navigate = useNavigate();

    const loadUserStatus = async () => {
        try {
            const response = await axios.get("/api/user");
            console.log(response);
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

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default Layout;
