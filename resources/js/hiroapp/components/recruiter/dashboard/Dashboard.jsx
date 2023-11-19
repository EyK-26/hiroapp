import React from "react";
import MostPopularPosition from "./MostPopularPosition";
import CandidatesHired from "./CandidatesHired";
import CandidatesInProgress from "./CandidatesInProgress";
import CandidatesWaitingForFeedback from "./CandidatesWaitingForFeedback";
import TotalApplicants from "./TotalApplicants";

const Dashboard = () => {
    return (
        <div>
            <TotalApplicants isMonthRestricted={false} />
            <TotalApplicants isMonthRestricted={true} />
            <MostPopularPosition />
            <CandidatesHired />
            <CandidatesInProgress />
            <CandidatesWaitingForFeedback />
        </div>
    );
};

export default Dashboard;
