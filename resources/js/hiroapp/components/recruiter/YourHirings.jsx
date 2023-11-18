import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const YourHirings = () => {
    const [hirings, setHirings] = useState([]);

    const fetchHirings = async () => {
        try {
            const response = await axios.get("/api/positions");
            setHirings(response.data);
        } catch (error) {
            console.log("UNKNOWN ERROR", error.response.data);
        }
    };

    useEffect(() => {
        fetchHirings();
    }, []);

    return (
        <div>
            {hirings.map((hiring) => (
                <div key={hiring.id}>
                    <Link to={"/positions/" + hiring.id}>
                        <h4>{hiring.name}</h4>
                    </Link>
                    <p>{hiring.applications.length}</p>
                    <p>
                        Due:{" "}
                        {hiring.start_date
                            ? hiring.start_date
                            : "Not determined"}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default YourHirings;
