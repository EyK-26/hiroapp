import React from "react";

const Pagination = ({ page, setPage, lastPage }) => {

    const nextPage = () => {
        if (page < lastPage) {
            setPage(page + 1);
        }
    };

    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div>
            <div>
                <button onClick={prevPage}> Prev </button>
                <span>{page}</span>
                <button onClick={nextPage}> Next </button>
            </div>
        </div>
    );
};

export default Pagination;
