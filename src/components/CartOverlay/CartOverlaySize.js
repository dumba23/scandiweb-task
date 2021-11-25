import React, { Component } from 'react';
import './CartOverlaySize.css'

export class CartOverlaySize extends Component{
    constructor(props){
        super(props);
        this.state={
            color:null,
            size:null,
        }
    }

    componentDidMount(){
        this.setState({color:this.props.selectedAttributes.color});
        this.setState({size:this.props.selectedAttributes.size});
    }
    
    handleClick = (e) =>{
        if(this.props.attributes[this.props.attributesIndex].type === "text"){
            this.setState({size:e.target.value})   
        } else this.setState({size:e.target.value})

        if(this.props.attributes[this.props.attributesIndex].type === 'swatch'){
            this.setState({color:e.target.value})
        }else this.setState({color:e.target.value})
    }

    renderValueInButton(value){
        if(this.props.attributes[this.props.attributesIndex].type === 'text' && this.props.attributes[this.props.attributesIndex].items[0].displayValue.length > 4){
            if(value.indexOf(' ') > 0) {
                return value[0]+value[value.indexOf(' ')+1];
            } return value[0]+value[1]+value[2] 
        }else if(this.props.attributes[this.props.attributesIndex].type === 'swatch' ){
            return ''
        }return value;
    }
    
    render(){
        return(
            <div className="cart-overlay-size-buttons">
                {
                 this.props.attributes[this.props.attributesIndex].items.map((item)=>{
                    return (
                            <div  className="cart-overlay-size-button" key={item.displayValue}>
                            <button
                            className="cart-overlay-buttons"
                            key={item.displayValue}
                            value={item.displayValue} 
                            onClick={this.handleClick}
                            style={this.state.size === item.displayValue || this.state.color === item.displayValue  ? {opacity:"0.4",  backgroundColor: `${item.displayValue}` } : {opacity:"", backgroundColor: `${item.displayValue}`}}
                            >
                                {this.renderValueInButton(item.displayValue)}
                            </button>
                            </div>
                    );
                })
                }
                
            </div>
        );  
    }
}

export default CartOverlaySize;