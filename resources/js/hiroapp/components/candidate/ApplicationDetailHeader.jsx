import React from "react";

const ApplicationDetailHeader = ({ applicant }) => {
    return <h2>
        Dear {applicant.first_name}, please find your applications below.
    </h2>;
};

export default ApplicationDetailHeader;
