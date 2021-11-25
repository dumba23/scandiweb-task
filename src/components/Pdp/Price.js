import React, {Component} from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

export class Price extends Component{
    constructor(){
        super()
        this.state={
            totalPrice:0
        }
    }
    static propTypes = {
        location: PropTypes.object.isRequired,
    };

    handleCurrencies = (param) => {
        if (param==="USD"){
            return "$"
        }
        if (param==="GBP"){
            return "€"
        }
        if(param==="JPY"){
            return "¥"
        }
    }

    render(){
    const { location } = this.props;
    const handleName = () =>{
        if(location.pathname === "/PDP") {
            return "Price:"
        }
    }
        return(
            <div className="price-container">
                <div className="price-name">
                    {handleName()}
                </div>
                <div className="price-amount">
                    {this.handleCurrencies(this.props.currency)}
                    {
                       this.props.price.map((price)=>{
                           
                        if(price.currency===this.props.currency){
                        var x = 0;
                         x = price.amount 
                        }
                        return x;    
                    })      
                    }
                </div>
            </div>

        );
    }
} 

export default withRouter(Price); 