import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Applicant from "./Applicant";
import ApplicantList from "./ApplicantList";
import PositionDetailDetails from "./PositionDetailDetails";

const PositionDetail = () => {
    const [positionData, setPositionData] = useState([]);
    const { id } = useParams();

    const fetchPositionDetail = async () => {
        try {
            const response = await axios.get(`/api/positions/${id}`);
            setPositionData(response.data);
            console.log(response.data);
        } catch (err) {
            console.log(err.response);
        }
    };

    useEffect(() => {
        fetchPositionDetail();
    }, []);

    return (
        <>
            <div>
                <h2>Position Details</h2>
                <PositionDetailDetails position={positionData.position} />
            </div>
            <div>
                <h3>Applicants</h3>
                <div>
                    {positionData.applications?.length === 0 ? (
                        "No applicants yet"
                    ) : (
                        <ApplicantList applicants={positionData.applications} />
                    )}
                </div>
            </div>
        </>
    );
};

export default PositionDetail;
