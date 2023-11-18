import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ApplicationDetailHeader from "./ApplicationDetailHeader";
import ApplicationDetailDetails from "./ApplicationDetailDetails";
import ApplicationDetailStatus from "./ApplicationDetailStatus";

const ApplicationDetail = () => {
    const [applicationData, setApplicationData] = useState(null);
    const [isEnded, setIsEnded] = useState(false);
    const [moveCount, setMoveCount] = useState(0);
    const { id } = useParams();
    const location = useLocation();
    const { applied } = location.state || false;

    const fetchApplicationData = async () => {
        try {
            const response = await axios.get(`/api/applications/${id}`);
            setApplicationData(response.data);
        } catch (err) {
            console.log(err.response);
        }
    };

    useEffect(() => {
        fetchApplicationData();
    }, [isEnded, moveCount]);

    return (
        <>
            {applicationData && (
                <div>
                    {applied && <p>Application Submitted!</p>}
                    <ApplicationDetailHeader applicant={applicationData.user} />
                    <ApplicationDetailDetails
                        application={{
                            position: applicationData.position,
                            applicationData: applicationData.application,
                            applicant: applicationData.user,
                        }}
                    />
                    <ApplicationDetailStatus
                        applicationStatus={{
                            applicationId: applicationData.application.id,
                            allStatuses: applicationData.all_statuses,
                            currentStatus: applicationData.status,
                            position: applicationData.position,
                            applicant: applicationData.user,
                        }}
                        setIsEnded={setIsEnded}
                        setMoveCount={setMoveCount}
                    />
                </div>
            )}
        </>
    );
};

export default ApplicationDetail;
