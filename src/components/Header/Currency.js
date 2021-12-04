import React,{Component} from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import './Currency.css';
 
export class Currency extends Component{
    constructor(props){
        super(props);  
        this.handleChange = this.handleChange.bind(this);  
        this.handleDropdown = this.handleDropdown.bind(this);
    }

    handleDropdown(){
        this.props.currencySwitcher(false);
    }

    handleChange(el){
        this.props.onCurrencyChange(el)
    }
   
    render(){
        return(
            <div className="currency-container" >   
            <div className="current-currency" style={{cursor:'pointer'}} onClick={this.handleDropdown}>{getSymbolFromCurrency(this.props.currency)}</div>         
                {
                    this.props.currencyOpen ?
                    this.props.currencies.map((el, index) => {
                        return (
                                <div key={index} className="dropdown-currecny" onClick={e=>{e.preventDefault();this.handleChange(el);this.handleDropdown()}}>
                                   <div className="dropdown-items"> {getSymbolFromCurrency(el)}{el} </div>
                                </div>
                        )
                    })
                    
                    :
                    ''
                }
            </div>
        );
    }
}

export default Currency;