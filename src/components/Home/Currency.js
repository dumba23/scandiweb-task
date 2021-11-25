import React,{Component} from 'react';
import './Currency.css';
 
export class Currency extends Component{
    constructor(props){
        super(props);  
        this.handleChange = this.handleChange.bind(this);  
    }
    
    handleChange(e){
        this.props.onCurrencyChange(e.target.value)
    }
   
    render(){
        return(
            <div className="currency-container">      
            <select value={this.props.value} onChange={this.handleChange}>
                <option value="USD">$ USD</option>
                <option value="GBP">€ GBP</option>
                <option value="JPY">¥ JPY</option>
            </select>
            </div>
        );
    }
}

export default Currency;