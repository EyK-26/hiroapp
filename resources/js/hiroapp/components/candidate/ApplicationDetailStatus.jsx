import React from "react";

const ApplicationDetailStatus = ({ applicationStatus }) => {
    const { allStatuses, currentStatus } = applicationStatus;
    const temporaryStyle = { backgroundColor: "green" };
    const renderedAllStatuses = allStatuses.map((status) => (
        <li
            key={status.id}
            style={status.id === currentStatus.id ? temporaryStyle : null}
        >
            {status.name}
        </li>
    ));
    return <ul>{renderedAllStatuses}</ul>;
};

export default ApplicationDetailStatus;
