import React, {Component} from 'react';
import { Query } from 'react-apollo';
import { CURRENCIES } from '../../queries';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Navbar.css';
import Currency from './Currency';
import Logo from './svgs/logo.png';
import Cart from '../CartOverlay/svgs/cart.png';
import CartOverlayList from '../CartOverlay/CartOverlayList';

export class Navbar extends Component{
    constructor(props){
        super(props);  
        this.ref = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);  
    }

    componentDidMount(){
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount(){
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(e){
        if(this.props.toggleAns){
            if (this.ref && !this.ref.current.contains(e.target)) {
                this.props.toggle(false);
            }
        }
    }

    handleChange(e){
        this.props.onCategoryChange(e.target.value)
    }

    toggle(){
        this.props.toggle();
    }

    renderTotalItems(){
        var count = 0;
        this.props.product.forEach((item)=>{ 
            count += item.counter;  
        })
        return count;
    }

    render(){
        return(
            <React.Fragment>
                <div className="header">
                    <div className="nav">
                        <nav className="navbar">
                        <Link to="/">
                        <button className="navbar-brand" value="" onClick={this.handleChange} style={this.props.activeCategory === '' ? {color:"green", borderBottom:"2px solid green"} : {color:"black"}}>
                            All
                        </button>
                        </Link>
                        </nav>
                        <nav className="navbar">
                        <Link to="/">
                        <button className="navbar-brand" value='tech' onClick={this.handleChange} style={this.props.activeCategory === 'tech' ? {color:"green", borderBottom:"2px solid green"} : {color:"black"}}>
                            Tech
                        </button>
                        </Link>
                        </nav>
                        <nav className="navbar">
                        <Link to="/">
                        <button className="navbar-brand" value='clothes' onClick={this.handleChange} style={this.props.activeCategory === 'clothes' ? {color:"green",  borderBottom:"2px solid green"} : {color:"black"}}>
                            Clothes
                        </button>
                        </Link>
                        </nav>
                    </div>
                    <div className="logo">
                        <Link to="/">
                        <img alt="logo" src={Logo} />
                        </Link>
                    </div>
                    <div className="actions">  
                    <Query query={CURRENCIES}>
                        {
                        ({ loading, error, data })=>{
                                    if(loading) return <h4>Loading...</h4>
                                    if(error) console.log(error);
                                    if(data){
                                        return <Currency currencies={data.currencies} currency={this.props.currency} onCurrencyChange={this.props.onCurrencyChange} currencySwitcher={this.props.currencySwitcher} currencyOpen={this.props.currencyOpen}/>
                                    }
                                    }
                                }
                        </Query>
                        
                    <div className="cart-button" onClick={this.toggle} style={{backgroundImage: `url(${Cart})`, cursor:'pointer'  }}>
                       {this.props.toggleCount>0 &&  <div className="cart-count">{this.renderTotalItems()}</div> }
                    </div>    
                    <div ref={this.ref} onClick={this.handleClickOutside}>
                    {
                    this.props.toggleAns && 
                    <div>
                    <CartOverlayList 
                    isCartOpen={this.props.toggleAns}
                    selectedAttributes={this.props.selectedAttributes}
                    attrChange={this.props.attrChangeFromCart}
                    count={this.props.toggleCount} 
                    product={this.props.product} 
                    currency={this.props.currency} 
                    toDeleteItem={this.props.toDeleteItem}
                    toggle={this.props.toggle}
                    countSelectedItem={this.props.countSelectedItem}
                    />
                    
                    </div>
                    } 
                    </div>           
                </div>    
                </div>
            </React.Fragment>
        );
    }
}

Navbar.propTypes = {
    onCategoryChange: PropTypes.func,
    toggle: PropTypes.func,
    product: PropTypes.array,
    activeCategory: PropTypes.string,
    currency: PropTypes.string,
    onCurrencyChange: PropTypes.func,
    currencySwitcher: PropTypes.func,
    currencyOpen: PropTypes.bool,
    toggleCount: PropTypes.number,
    toggleAns: PropTypes.bool,
    selectedAttributes: PropTypes.array,
    attrChangeFromCart: PropTypes.func,
    toDeleteItem: PropTypes.func,
    countSelectedItem: PropTypes.func
}


export default Navbar;