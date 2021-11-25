import React, { Component } from 'react';

class CartOverlayItemImg extends Component{
    constructor(props){
        super(props)
        this.state={
            currImg:0
        }
    }

    render(){
        return(
            <div>
                <img src={this.props.images[this.state.currImg]} alt="img" style={{width:`${this.props.width}`, height:`${this.props.height}`, paddingTop:'5px', }}/>
            </div>
        );
    }
}

export default CartOverlayItemImg;