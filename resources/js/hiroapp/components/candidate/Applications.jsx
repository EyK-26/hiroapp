import axios from "axios";
import React, { useEffect, useState } from "react";

const Applications = () => {
    const [applications, setApplications] = useState([]);

    const loadApplications = async () => {
        const response = await axios.get("/api/applications");
        setApplications(response.data);
        console.log(response.data);
    };

    useEffect(() => {
        loadApplications();
        console.log("EFF");
    }, []);

    return (
        <div>
            {applications.length !== 0 ? (
                applications.map((application) => (
                    <div key={application.id}>
                        <span>{application.position.name}</span>
                        <span>{application.status.name}</span>
                    </div>
                ))
            ) : (
                <span>No applications</span>
            )}
        </div>
    );
};

export default Applications;
