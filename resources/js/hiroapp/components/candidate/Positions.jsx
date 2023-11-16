import axios from "axios";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import Context from "../../context/Context";
import SearchBar from "../SeachBar";
import Pagination from "../Pagination";

const Positions = () => {
    const [positions, setPositions] = useState([]);
    const { state } = useContext(Context);

    //for search nad pagination
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    //calculate slice for serach results
    const startResults = 20 * (page - 1)
    const endResults = 20 * page - 1
    const lastPage = Math.floor(positions.length / 20)

    const loadPositions = async () => {
        const response = await axios.get(`/api/positions?search=${search}`);
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

    // fetch Avaliable positions
    useEffect(() => {
        loadPositions();
        setPage(1);
    }, [search]);



    return (
        <div>
            <Link to="/positions">
                <h2>Positions</h2>
            </Link>
            <SearchBar subject="a position" setSearch={setSearch} />
            {positions.length >= 20 && <Pagination page={page} setPage={setPage} lastPage={lastPage} />}
            <div>
                {positions.length !== 0 ? (
                    positions.slice(startResults, endResults).map((position) => (
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
            {positions.length >= 20 && <Pagination page={page} setPage={setPage} lastPage={Math.floor(positions.length / 20)} />}
        </div>
    );
};

export default Positions;
