import React,{Component} from 'react';
import PropTypes from 'prop-types';
import getSymbolFromCurrency from 'currency-symbol-map';

import './Currency.css';
import up from './svgs/up.png';
import down from './svgs/down.png';
 
export class Currency extends Component{
    constructor(props){
        super(props);  
        this.myRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleChange = this.handleChange.bind(this);  
        this.handleDropdown = this.handleDropdown.bind(this);
    }
    
    componentDidMount(){
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount(){
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    handleDropdown(){
        this.props.currencySwitcher(false);
    }

    handleChange(el){
        this.props.onCurrencyChange(el)
    }
    
    handleClickOutside(e){
        if(this.props.currencyOpen){
        if (this.myRef && !this.myRef.current.contains(e.target)) {
            this.props.currencySwitcher(false);
        }
        }
    }

    render(){
        return(
            <div className="currency-container" ref={this.myRef} onClick={this.handleOutSideClick}>   
            <div className="current-currency" 
            style={{cursor:'pointer'}} 
            onClick={this.handleDropdown}>
                {getSymbolFromCurrency(this.props.currency)}
                <span className="currency-vector">{this.props.currencyOpen ? <img src={up}/> : <img src={down}/>}</span>
            </div>         
                {
                    this.props.currencyOpen ?
                    <div className="dropdown-list">
                        {
                    this.props.currencies.map((el, index) => {
                        return (
                                   <div 
                                    key={index}
                                    onClick={()=>{this.handleChange(el);this.handleDropdown()}}
                                    className="dropdown-items"> 
                                    {getSymbolFromCurrency(el)}
                                    {` ${el}`} 
                                   </div>
                        )
                    })    
                }
                </div>
                :
                ''
                }
            </div>
        );
    }
}


Currency.propTypes = {
    currencySwitcher: PropTypes.func,
    onCurrencyChange: PropTypes.func,
    currency: PropTypes.string,
    currencyOpen: PropTypes.bool,
    currencies: PropTypes.array
}

export default Currency;