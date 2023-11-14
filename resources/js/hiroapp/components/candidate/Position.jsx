import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Position = () => {
    const [position, setPosition] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const loadPosition = async () => {
        try {
            const response = await axios.get(`/api/positions/${id}`);
            setPosition(response.data);
            if (response.data.hiring !== 1) {
                navigate('/')
            }
        } catch (error) {
            console.log(error.response.data)
        }
    };

    useEffect(() => {
        loadPosition();
    }, []);

    return (
        <div>
            {
                position
                    ?
                    <>
                        <h2>{position.name}</h2>
                        <div>
                            <div>
                                <span>Department: {position.department.name}</span>
                                <span>Grade : {position.grade.name}</span>
                            </div>
                            <p>{position.description}</p>
                        </div>
                        <Link to={'/apply/' + id}>
                            <button>Apply</button>
                        </Link>
                    </>
                    : <span>Position does not exist</span>
            }
        </div>
    )
};

export default Position;
