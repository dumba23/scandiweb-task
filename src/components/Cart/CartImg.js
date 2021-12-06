import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Left from './svgs/left.png';
import Right from './svgs/right.png';

export class CartImg extends Component{
    constructor(){
        super()
        this.handleClickRight = this.handleClickRight.bind(this);
        this.handleClickLeft = this.handleClickLeft.bind(this);
            this.state={
                current:0
            }   
    }

    handleClickRight(){
        if(this.props.images.length > 1 && this.state.current !== this.props.images.length) {
            this.setState({current:this.state.current + 1});
        }else if(this.props.images.length > 1 && this.state.current === this.props.images.length-1){
            this.setState({current:0});
        }
    }

    handleClickLeft(){
        if(this.props.images.length > 1 && this.state.current !== 0){
            this.setState({current:this.state.current - 1});
        }else if (this.props.images.length > 1 && this.state.current === 0){
            this.setState({current:this.props.images.length});
        }
    }

    render(){
        return(
            <div>
                <button className="left-arrow" onClick={this.handleClickLeft}><img src={`${Left}`} alt="right arrow"/></button>
                    <img src={this.props.images[this.state.current]} alt="img" style={{maxWidth:`${this.props.width}`, maxHeight:`${this.props.height}`, paddingTop:'5px', }}/>
                <button className="right-arrow" onClick={this.handleClickRight}><img src={`${Right}`} alt="left arrow"/></button>
            </div>
        );
    }
}

CartImg.propTypes = {
    images: PropTypes.array,
    width: PropTypes.string,
    height: PropTypes.string
}

export default CartImg;