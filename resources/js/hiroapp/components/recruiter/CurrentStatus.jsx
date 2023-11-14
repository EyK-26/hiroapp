import axios from "axios";
import React, { useEffect, useState } from "react";

const CurrentStatus = ({ currentStatus_id }) => {
    const [status, setStatus] = useState("");

    const fetchStatus = async () => {
        try {
            const response = await axios.get(
                `/api/statuses/${currentStatus_id}`
            );
            setStatus(response.data);
        } catch (err) {
            console.log(err.response);
        }
    };

    useEffect(() => {
        fetchStatus();
    }, []);

    return <>{status && status}</>;
};

export default CurrentStatus;
