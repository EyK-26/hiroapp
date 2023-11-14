import React from "react";
import Applicant from "./Applicant";
import CurrentStatus from "./CurrentStatus";

const ApplicantList = ({ applicants }) => {
    return (
        <>
            {applicants
                ? applicants.map((application) => (
                      <ul key={application.user_id}>
                          <Applicant user={application.user} />
                          <CurrentStatus status={application.status} />
                      </ul>
                  ))
                : "Loading Applicants"}
        </>
    );
};

export default ApplicantList;
