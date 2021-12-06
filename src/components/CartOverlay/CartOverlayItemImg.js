import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CartOverlayItemImg extends Component{
    render(){
        return(
            <div>
                <img src={this.props.images[0]} alt="img" style={{maxWidth:`${this.props.width}`, maxHeight:`${this.props.height}`, paddingTop:'5px', }}/>
            </div>
        );
    }
}

CartOverlayItemImg.propTypes = {
    images:PropTypes.array,
    width:PropTypes.string,
    height:PropTypes.string
}

export default CartOverlayItemImg;