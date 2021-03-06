import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './CartOverlayBackground.css';

class CartOverlayBackground extends Component{
    constructor(){
        super()
        this.handleClick = this.handleClick.bind(this);
        this.state={
            isHidden:false
        }
    }

    handleClick(){
        this.props.toggle(this.state.isHidden)
    }
    
    render(){
        return(
            <div onClick={this.handleClick} className="cart-overlay-background">
                <div className="cart-overlay-background-white"></div>
            </div>
        )
    }
}

CartOverlayBackground.propTypes = {
    toggle:PropTypes.func
}

export default CartOverlayBackground;
