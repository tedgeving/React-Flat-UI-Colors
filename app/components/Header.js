import React, { Component } from 'react';
import PropTypes from 'prop-types';


/**
 * Displays site header
 * @param  {obj} props
 * @return {null}
 */
const Header = function(props){
        var ColorValues = ['rgb', 'hex'];
        var Options = function(option){
            return (<option key={option}>{option}</option>)
        }

        return (
            <header>
                <h3>Color Format</h3>
                <div>
                  <select value = {props.value}
                          onChange = {props.onAction}
                  >
                  {ColorValues.map(Options)}
                  </select>
                </div>
            </header>
        )
}

Header.PropTypes = {
    value: PropTypes.string.isRequired,
    onAction:  PropTypes.func.isRequired
}

export default Header;
