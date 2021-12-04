import React, { Component } from 'react';

class CartOverlayItemImg extends Component{
    render(){
        return(
            <div>
                <img src={this.props.images[0]} alt="img" style={{maxWidth:`${this.props.width}`, maxHeight:`${this.props.height}`, paddingTop:'5px', }}/>
            </div>
        );
    }
}

export default CartOverlayItemImg;