import React, { useState } from "react";

const SearchBar = ({ setSearch, subject }) => {
    const [input, setInput] = useState("");

    const handleSearch = (event) => {
        setInput(event.target.value);
    };

    const submitSearch = (event) => {
        event.preventDefault();
        setSearch(input);
    };

    return (
        <div >
            <form onSubmit={submitSearch}>
                <input
                    type="text"
                    placeholder={"Search for and " + subject + "...."}
                    onInput={handleSearch}
                    value={input}
                />
                <button type="submit"> Search </button>
            </form>
        </div>
    );
};

export default SearchBar;
