import axios from "axios";
import React, { useEffect, useState } from "react";

const Applicant = ({ user_id }) => {
    const [applicant, setApplicant] = useState(null);

    const fetchApplicant = async () => {
        try {
            const response = await axios.get(`/api/users/${user_id}`);
            setApplicant(response.data);
        } catch (err) {
            console.log(err.response);
        }
    };

    useEffect(() => {
        fetchApplicant();
    }, []);

    return (
        applicant && (
            <li>
                {applicant.first_name} {applicant.last_name}
            </li>
        )
    );
};

export default Applicant;
