import React from "react";
import PropTypes from 'prop-types';

const SearchBar = (props) => {
    const {keyword} = props;

    return (
        <div>
            <h3>This is the search bar</h3>
            <pre><code>keyword: {keyword}</code></pre>
        </div>
    )
};

SearchBar.propTypes = {
    keyword: PropTypes.string,
};

export default SearchBar;
