import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SeachBar";
import Pagination from "../Pagination";

const Applications = () => {
    const [applications, setApplications] = useState([]);

    //for search nad pagination
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    //calculate slice for serach results
    const startResults = 20 * (page - 1)
    const endResults = 20 * page - 1
    const lastPage = Math.floor(applications.length / 20)


    const loadApplications = async () => {
        const response = await axios.get(`/api/applications?search=${search}`);
        setApplications(response.data);
    };

    useEffect(() => {
        loadApplications();
        setPage(1);
    }, [search]);

    return (
        <div>
            <Link to="/applications">
                <h2>Applications</h2>
            </Link>
            <SearchBar subject="a position" setSearch={setSearch} />
            {applications.length >= 20 && <Pagination page={page} setPage={setPage} lastPage={lastPage} />}
            <div>
                {applications.length !== 0 ? (
                    applications.slice(startResults, endResults).map((application) => (
                        <Link to={'/applications/' + application.id} key={application.id}>
                            <div >
                                <span>{application.position.name}</span>
                                <span>{application.status.name}</span>
                            </div>
                        </Link>
                    ))
                ) : (
                    <span>No applications</span>
                )}
            </div>
        </div>
    );
};

export default Applications;
