import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Applicant from "./Applicant";
import ApplicantList from "./ApplicantList";

const PositionDetail = () => {
    const [positionData, setPositionData] = useState([]);
    const { id } = useParams();

    const fetchPositionDetail = async () => {
        try {
            const response = await axios.get(`/api/positions/${id}`);
            setPositionData(response.data);
        } catch (err) {
            console.log(err.response);
        }
    };

    useEffect(() => {
        fetchPositionDetail();
    }, []);

    return (
        <>
            {positionData.applicants?.length === 0 ? (
                "No applicants yet"
            ) : (
                <ApplicantList applicants={positionData.applications} />
            )}
        </>
    );
};

export default PositionDetail;
