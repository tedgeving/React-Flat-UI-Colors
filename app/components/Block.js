import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Block, colored div displays color value name
 * @param  {obj} props
 * @return {null}
 */
const Block = function(props){
    var divStyle = {
        "backgroundColor": props.hex
    };
    return (
        <div className="block"
             style = {divStyle}
             onClick = {props.onAction} >
            <span className="name">{props.name}</span>
            { props.value === "rgb" ? props.rgb : null }
            { props.value === "hex" ? props.hex : null }
            <div className="hover">Copy</div>
        </div>
    )
}

Block.PropTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    rgb: PropTypes.string.isRequired,
    hex: PropTypes.string.isRequired,
    onAction:  PropTypes.func.isRequired
}

export default Block
