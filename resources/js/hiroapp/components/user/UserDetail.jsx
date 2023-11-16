import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserDetail = () => {
    const [userData, setUserData] = useState(null);
    const { id } = useParams();

    const fetchUserDetail = async () => {
        try {
            const response = await axios.get(`/api/users/${id}`);
            setUserData(response.data);
        } catch (err) {
            console.log(err.response);
        }
    };

    useEffect(() => {
        fetchUserDetail();
    }, []);

    return (
        <>
            {userData && (
                <ul>
                    <li>
                        Name: {userData.user.first_name}{" "}
                        {userData.user.last_name}
                    </li>
                    <li>Email: {userData.user.email}</li>{" "}
                    <button>Contact User</button>
                    <li>Position: {userData.position_name}</li>
                    <li>Department: {userData.department_name}</li>
                </ul>
            )}
        </>
    );
};

export default UserDetail;