import React, { useContext, useEffect, useState } from "react";
import Context from "../../../context/Context";
import TotalApplicantsInDepartmentDetail from "./TotalApplicantsInDepartmentDetail";
import axios from "axios";

const TotalApplicantsInDepartment = () => {
    const { state } = useContext(Context);
    const [data, setData] = useState(0);
    const [detailData, setDetailData] = useState([]);
    const [isDetailDataExpanded, setIsDetailDataExpanded] = useState(false);

    const fetchTotalApplicants = async () => {
        try {
            const response = await axios.get("/api/dashboard/totalapplicants", {
                params: {
                    department_id: state.user?.position?.department.id,
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
            {data && (
                <span onClick={() => setIsDetailDataExpanded((prev) => !prev)}>
                    {data}
                </span>
            )}
            {detailData && isDetailDataExpanded && (
                <TotalApplicantsInDepartmentDetail detailData={detailData} />
            )}
        </div>
    );
};

export default TotalApplicantsInDepartment;
