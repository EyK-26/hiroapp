import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Context from "../../context/Context";

const Positions = () => {
    const [positions, setPositions] = useState([]);
    const { state } = useContext(Context);

    const loadPositions = async () => {
        const response = await axios.get("/api/positions");
        const data = response.data;
        const new_data = []

        // filters duplicate data from response
        data.forEach(position => {
            if (position.applications.length !== 0) {
                let isApplied = false
                for (let i = 0; i < position.applications.length; i++) {
                    if (state.user.id === position.applications[i].user_id) {
                        isApplied = true
                    }
                }
                if (!isApplied) {
                    new_data.push(position)
                }
            } else {
                new_data.push(position)
            }
        });
        setPositions(new_data);
    };

    useEffect(() => {
        loadPositions();
    }, []);

    return (
        <div>
            <Link to="/positions">
                <h2>Positions</h2>
            </Link>
            <div>
                {positions.length !== 0 ? (
                    positions.map((position) => (
                        <Link to={'/positions/' + position.id} key={position.id}>
                            <div >
                                <span>{position.name}</span>
                            </div>
                        </Link>
                    ))
                ) : (
                    <span>No positions</span>
                )}
            </div>
        </div>
    );
};

export default Positions;
