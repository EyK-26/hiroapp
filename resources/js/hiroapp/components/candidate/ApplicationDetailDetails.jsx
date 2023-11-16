import React, { useContext } from "react";
import Context from "../../context/Context";

const ApplicationDetailDetails = ({ application }) => {
    const { position, applicationData, applicant } = application;
    const { state } = useContext(Context);
    return (
        <>
            <h3>
                {state.user.role_id === 2
                    ? "Details of your application:"
                    : "Manage Application"}
            </h3>
            <div>
                <h4>Position name: {position.name}</h4>
                <p>
                    Details of the Position:
                    {position.description}
                </p>
                {state.user.role_id === 3 && (
                    <h5>
                        Applicant: {applicant.first_name} {applicant.last_name}
                    </h5>
                )}
                <span>Submitted Information</span>
                <ul>
                    <li>
                        <span>Your small motivation text:</span>
                        <p>{applicationData.attachment_text}</p>
                    </li>

                    <li>
                        <span>
                            click below to download the submitted document
                        </span>
                        <a
                            href={applicationData.attachment_file}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Attachment
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default ApplicationDetailDetails;
