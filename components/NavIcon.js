import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import styles from '../styles';

const NavIcon = ({focused = true, name, color = styles.blackColor, size=22 }) => (
    <Ionicons 
        name={name} 
        color={focused ? color : styles.lightGreyColor} 
        size={size} 
    />
)

NavIcon.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number,
    focused: PropTypes.bool
};

export default NavIcon;