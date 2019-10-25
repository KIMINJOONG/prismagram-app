import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native-gesture-handler';

const SearchBar = ({
    onChange,
    value,
    onSubmit
}) => {
    return (
        <TextInput value={value} placeholder={'Search'} />
    )
};

SearchBar.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default SearchBar;