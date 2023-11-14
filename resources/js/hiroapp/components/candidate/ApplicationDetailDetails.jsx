import React from "react";

const ApplicationDetailDetails = ({ application }) => {
    const { position, applicationData } = application;
    return (
        <>
            <h3>Details of your application:</h3>
            <div>
                <h4>Applied Position name: {position.name}</h4>
                <p>
                    Details of the Position:
                    {position.description}
                </p>
                <span>Submitted Documents</span>
                <ul>
                    <li>
                        <span>Your small motivation text:</span>
                        <p>{applicationData.attachment_text}</p>
                    </li>

                    <li>
                        <span>
                            click below to download the document you have
                            submitted
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
