import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Positions = () => {
    const [positions, setPositions] = useState([]);

    const loadPositions = async () => {
        const response = await axios.get("/api/applications");
        setPositions(response.data);
        console.log(response.data);
    };

    useEffect(() => {
        loadPositions();
        console.log("EFF");
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
                                <span>{position.position.name}</span>
                                <span>{position.position.description}</span>
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
