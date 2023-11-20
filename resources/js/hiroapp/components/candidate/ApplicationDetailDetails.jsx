import React, { useContext } from "react";
import Context from "../../context/Context";
import { Link } from "react-router-dom";

const ApplicationDetailDetails = ({ application }) => {
    const { state } = useContext(Context);
    return (
        <>
            <h3>
                {state.user.role_id === 2
                    ? "Details of your application:"
                    : "Manage Application"}
            </h3>
            <div>
                <h4>Position title: {application.position.name}</h4>
                <h5>Department: {application.position?.department.name}</h5>
                <p>
                    Details of the Position:
                    {application.position.description}
                </p>
                {state.user.role_id === 3 && (
                    <h5>
                        Applicant:
                        <Link to={`/users/${application.user.id}`}>
                            {application.user.first_name}{" "}
                            {application.user.last_name}
                        </Link>
                    </h5>
                )}
                <span>Submitted Information</span>
                <ul>
                    <li>
                        <span>Your motivation text:</span>
                        <p>{application.attachment_text}</p>
                    </li>
                    <li>
                        <span>submitted url</span>
                        <a
                            href={application.attachment_file}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            URL
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default ApplicationDetailDetails;
