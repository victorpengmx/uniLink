import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForumpostContext } from '../hooks/useForumpostContext';

const SearchForm = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { state, dispatch } = useForumpostContext();

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch({ type: 'SEARCH_FORUMPOSTS', payload: searchQuery });
        setSearchQuery('');
    };

    const handleClear = () => {
        setSearchQuery('');
        dispatch({ type: 'CLEAR_SEARCH' });
        navigate('/');
    };

    return (
        <form className="searchForm" onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Search</button>
            {searchQuery && <button type="button" onClick={handleClear}>Clear</button>}
        </form>
    );
};

export default SearchForm;
