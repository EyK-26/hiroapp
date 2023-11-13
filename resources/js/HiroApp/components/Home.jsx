import React, { useContext } from "react";
import Context from "../context/Context";

const Home = () => {
    const { state, dispatch } = useContext(Context);

    return <>{state.user?.first_name}</>;
};

export default Home;
