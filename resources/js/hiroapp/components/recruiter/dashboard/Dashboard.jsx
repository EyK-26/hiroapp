import React from "react";
import TotalApplicants from "./Applicants";

const Dashboard = () => {
    return (
        <div>
            <TotalApplicants />
            <TotalApplicants isMonthRestricted />
            <TotalApplicants isFeedbackRestricted />
            <TotalApplicants isHiredRestricted />
            <TotalApplicants isRejectedRestricted />
            <TotalApplicants isInterviewRestricted />
        </div>
    );
};

export default Dashboard;
