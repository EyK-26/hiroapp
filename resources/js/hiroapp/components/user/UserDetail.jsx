import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContactUser from "./ContactUser";
import Context from "../../context/Context";

const UserDetail = () => {
    const navigate = useNavigate();
    const { state } = useContext(Context);
    const [userData, setUserData] = useState(null);
    const [isEmailPopupOpen, setIsEmailPopupOpen] = useState(false);
    const [isDeletePopupOpen, setisDeletePopupOpen] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const { id } = useParams();

    const fetchUserDetail = async () => {
        try {
            const response = await axios.get(`/api/users/${id}`);
            if (Math.floor(response.status / 100) === 2) {
                setUserData(response.data);
            }
        } catch (err) {
            console.log(err.response);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.post("/api/users/" + id + "/delete");
            if (Math.floor(response.status / 100) === 2) {
                navigate("/users", { state: { userDeleted: true } });
            }
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
                <div className="UserDetail">
                    {state.user.role_id === 1 && (
                        <button onClick={() => setisDeletePopupOpen(true)}>
                            Delete user
                        </button>
                    )}
                    {isDeletePopupOpen && (
                        <div>
                            <span>
                                Are you sure you want to remove the user from
                                the system?
                            </span>
                            <button onClick={() => handleDelete(id)}>
                                Confirm
                            </button>
                            <button onClick={() => setisDeletePopupOpen(false)}>
                                Cancel
                            </button>
                        </div>
                    )}

                    <span>
                        Name: {userData.user.first_name}
                        {userData.user.last_name}
                    </span>
                    <span>Email: {userData.user.email}</span>
                    <span>Position: {userData.position_name}</span>
                    <span>Department: {userData.department_name}</span>
                    <button onClick={() => setIsEmailPopupOpen(true)}>
                        Contact User
                    </button>
                    <div className="email_container">
                        {isEmailPopupOpen && (
                            <ContactUser
                                userData={userData.user}
                                setIsEmailPopupOpen={setIsEmailPopupOpen}
                                setIsSent={setIsSent}
                            />
                        )}
                        {isSent && <span>message successfully sent</span>}
                    </div>
                </div>
            )}
        </>
    );
};

export default UserDetail;
