import React, { useContext, useEffect, useState } from "react";
import Context from "../context/Context";
import { redirect } from "react-router-dom";

const Home = () => {
    const { state } = useContext(Context);

    switch (state.user?.role_id) {
        case 1:
            redirect("/admin");
            break;
        case 2:
            redirect("/candidate");
            break;
        case 3:
            redirect("/recruiter");
            break;
        default:
            break;
    }

    return <>Default Homepage</>;
};

export default Home;
