import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
            <Link to="/applications">
                <h2>Applications</h2>
            </Link>
            <div>
                {applications.length !== 0 ? (
                    applications.map((application) => (
                        <Link to={'/applications/' + application.id} key={application.id}>
                            <div >
                                <span>{application.position.name}</span>
                                <span>{application.status.name}</span>
                            </div>
                        </Link>
                    ))
                ) : (
                    <span>No applications</span>
                )}
            </div>
        </div>
    );
};

export default Applications;
