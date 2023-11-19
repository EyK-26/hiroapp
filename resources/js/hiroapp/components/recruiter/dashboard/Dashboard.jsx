import React from "react";
import MostPopularPosition from "./MostPopularPosition";
import TotalApplicantsInDepartment from "./TotalApplicantsInDepartment";
import CandidatesHired from "./CandidatesHired";
import ApplicantsThisMonth from "./ApplicantsThisMonth";
import CandidatesInProgress from "./CandidatesInProgress";
import CandidatesWaitingForFeedback from "./CandidatesWaitingForFeedback";

const Dashboard = () => {
    return (
        <div>
            <TotalApplicantsInDepartment />
            <ApplicantsThisMonth />
            <MostPopularPosition />
            <CandidatesHired />
            <CandidatesInProgress />
            <CandidatesWaitingForFeedback />
        </div>
    );
};

export default Dashboard;
