import React, {Component} from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import PropTypes from 'prop-types';

export class Price extends Component{
    render(){
        return(
            <div className="price-container">
                <div className="price-name" style={{fontSize:"18px", fontWeight:"bold"}}>
                    {'PRICE:'}
                </div>
                <div className="price-amount" style={{fontSize:"20px", fontWeight:"bold"}}>
                    {getSymbolFromCurrency(this.props.currency)}
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

Price.propTypes = {
    currency: PropTypes.string,
    price: PropTypes.array,
}

export default Price; 