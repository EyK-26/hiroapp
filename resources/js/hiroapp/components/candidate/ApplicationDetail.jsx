import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApplicationDetailHeader from "./ApplicationDetailHeader";
import ApplicationDetailDetails from "./ApplicationDetailDetails";
import ApplicationDetailStatus from "./ApplicationDetailStatus";

const ApplicationDetail = () => {
    const [applicationData, setApplicationData] = useState(null);
    const [isEndedByCandidate, setIsEndedByCandidate] = useState(false);
    const { id } = useParams();

    const fetchApplicationData = async () => {
        try {
            const response = await axios.get(`/api/applications/${id}`);
            setApplicationData(response.data);
            console.log(response.data);
        } catch (err) {
            console.log(err.response);
        }
    };

    useEffect(() => {
        fetchApplicationData();
    }, [isEndedByCandidate]);

    return (
        <>
            {applicationData && (
                <div>
                    <ApplicationDetailHeader applicant={applicationData.user} />
                    <ApplicationDetailDetails
                        application={{
                            position: applicationData.position,
                            applicationData: applicationData.application,
                        }}
                    />
                    <ApplicationDetailStatus
                        applicationStatus={{
                            applicationId: applicationData.application.id,
                            allStatuses: applicationData.all_statuses,
                            currentStatus: applicationData.status,
                        }}
                        setIsEndedByCandidate={setIsEndedByCandidate}
                        isEndedByCandidate={isEndedByCandidate}
                    />
                </div>
            )}
        </>
    );
};

export default ApplicationDetail;
