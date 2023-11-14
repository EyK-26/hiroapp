import React from "react";
import Applicant from "./Applicant";
import CurrentStatus from "./CurrentStatus";

const ApplicantList = ({ applicants }) => {
    return (
        <>
            {applicants
                ? applicants.map((application) => (
                      <ul key={application.user_id}>
                          <Applicant user_id={application.user_id} />
                          <CurrentStatus
                              currentStatus_id={application.status_id}
                          />
                      </ul>
                  ))
                : "Loading Applicants"}
        </>
    );
};

export default ApplicantList;