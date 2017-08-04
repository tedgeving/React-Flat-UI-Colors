import React, { Component } from 'react';
import PropTypes from 'prop-types';


/**
 * Overlay displays message when color blcok is clicked
 * @param  {obj} props
 * @return {null}
 */
const Overlay = function(props){
    var divStyle = {
        "backgroundColor": props.bg
    };

    return (
       <div className="overlay"
                style= { divStyle }
                onClick = { props.onAction }
        >
         <div className="message">
           { props.message }
         </div>
       </div>
     );
}


Overlay.PropTypes = {
    message: PropTypes.string.isRequired,
    onAction:  PropTypes.func.isRequired
}

export default Overlay
