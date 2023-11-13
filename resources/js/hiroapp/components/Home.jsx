import React, { useContext, useEffect, useState } from "react";
import Context from "../context/Context";

const Home = () => {
    const { state } = useContext(Context);
    const [user, setUser] = useState("");

    useEffect(() => {
        if (state.user !== null) {
            setUser(state.user.first_name);
        }
    }, [state.user]);

    return <>{user}</>;
};

export default Home;
