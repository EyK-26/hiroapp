import React, { useContext, useEffect, useState } from "react";
import Context from "../../../context/Context";
import TotalApplicantsDetail from "./TotalApplicantsDetail";
import axios from "axios";

const TotalApplicants = ({ isMonthRestricted }) => {
    const { state } = useContext(Context);
    const [data, setData] = useState(0);
    const [detailData, setDetailData] = useState([]);
    const [isDetailDataExpanded, setIsDetailDataExpanded] = useState(false);

    const fetchTotalApplicants = async () => {
        try {
            const response = await axios.get("/api/dashboard/totalapplicants", {
                params: {
                    department_id: state.user?.position?.department.id,
                    isMonthRestricted: isMonthRestricted ? 1 : 0,
                },
            });
            setData(response.data);
        } catch (err) {
            console.log(err.response);
        }
    };

    const fetchTotalApplicantsDetail = async () => {
        try {
            const response = await axios.get(
                "/api/dashboard/totalapplicantsdetail",
                {
                    params: {
                        department_id: state.user?.position?.department.id,
                        isMonthRestricted: isMonthRestricted ? 1 : 0,
                    },
                }
            );
            setDetailData(response.data);
        } catch (err) {
            console.log(err.response);
        }
    };

    useEffect(() => {
        fetchTotalApplicants();
    }, []);

    useEffect(() => {
        if (isDetailDataExpanded) {
            fetchTotalApplicantsDetail();
        }
    }, [isDetailDataExpanded]);

    return (
        <div>
            <h3>
                {isMonthRestricted
                    ? "Candidates Applied This Month"
                    : "Total Number of Candidate"}
            </h3>
            {data && (
                <div>
                    {data}{" "}
                    <span
                        onClick={() => setIsDetailDataExpanded((prev) => !prev)}
                    >
                        click to expand
                    </span>
                </div>
            )}
            {detailData && isDetailDataExpanded && (
                <TotalApplicantsDetail detailData={detailData} />
            )}
        </div>
    );
};

export default TotalApplicants;
