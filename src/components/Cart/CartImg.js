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
        if(this.props.images.length > 1 && this.state.current !== this.props.images.length - 1) {
            this.setState({current:this.state.current + 1});
        }else if(this.props.images.length > 1 && this.state.current === this.props.images.length-1){
            this.setState({current:1});
        }
    }

    handleClickLeft(){
        console.log(this.props.images.length, "state:" + this.state.current)
        if(this.props.images.length > 1 && this.state.current > 0){
            this.setState({current:this.state.current - 1});
        }else if (this.props.images.length > 1 && this.state.current === 0){
            this.setState({current:this.props.images.length - 1});
        }
    }

    render(){
        return(
            <div>
               {this.props.images.length > 1 ? <button className="left-arrow" onClick={this.handleClickLeft}><img src={`${Left}`} alt="right arrow"/></button> : null}
                    <img src={this.props.images[this.state.current]} alt="img" style={{maxWidth:`${this.props.width}`, maxHeight:`${this.props.height}`, paddingTop:'5px', }}/>
                {this.props.images.length > 1 ? <button className="right-arrow" onClick={this.handleClickRight}><img src={`${Right}`} alt="left arrow"/></button> : null}
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