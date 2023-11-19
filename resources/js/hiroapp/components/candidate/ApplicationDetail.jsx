import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ApplicationDetailHeader from "./ApplicationDetailHeader";
import ApplicationDetailDetails from "./ApplicationDetailDetails";
import ApplicationDetailStatus from "./ApplicationDetailStatus";

const ApplicationDetail = () => {
    const [appData, setAppData] = useState(null);
    const [isEnded, setIsEnded] = useState(false);
    const [moveCount, setMoveCount] = useState(0);
    const { id } = useParams();
    const location = useLocation();
    const { applied } = location.state || false;

    const fetchAppData = async () => {
        try {
            const response = await axios.get(`/api/applications/${id}`);
            setAppData(response.data);
        } catch (err) {
            console.log(err.response);
        }
    };

    useEffect(() => {
        fetchAppData();
    }, [isEnded, moveCount]);

    return (
        <>
            {appData && (
                <div>
                    {applied && <p>Application Submitted!</p>}
                    <ApplicationDetailHeader
                        applicant={appData.application.user}
                    />
                    <ApplicationDetailDetails
                        application={appData.application}
                    />
                    <ApplicationDetailStatus
                        allStatuses={appData.all_statuses}
                        application={appData.application}
                        setIsEnded={setIsEnded}
                        setMoveCount={setMoveCount}
                    />
                </div>
            )}
        </>
    );
};

export default ApplicationDetail;
