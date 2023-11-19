import React from "react";
import { Link } from "react-router-dom";

const TotalApplicantsInDepartmentDetail = ({ detailData }) => {
    console.log(detailData);
    const renderedDetailData = detailData.map((data) => (
        <div key={data.id}>
            <ul>
                <li>
                    Candidate:{" "}
                    <Link to={`/users/${data.user?.id}`}>
                        {data.user?.first_name} {data.user?.last_name}
                    </Link>
                </li>
                <li>
                    Applied To:{" "}
                    <Link to={`/positions/${data.position?.id}`}>
                        {data.position?.name}
                    </Link>
                </li>
                <li>
                    <Link to={`/applications/${data.id}`}>
                        Go to application
                    </Link>
                </li>
            </ul>
        </div>
    ));
    return <div>{renderedDetailData}</div>;
};

export default TotalApplicantsInDepartmentDetail;
