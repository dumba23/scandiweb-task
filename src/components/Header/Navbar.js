import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Currency from '../Home/Currency';
import Logo from './svgs/logo.png';
import Cart from '../CartOverlay/svgs/cart.png';
import CartOverlayList from '../CartOverlay/CartOverlayList';

export class Navbar extends Component{
    constructor(props){
        super(props);  
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);  
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
                        <button className="navbar-brand" value='1' onClick={this.handleChange} style={this.props.activeCategory === '1' ? {color:"green", borderBottom:"2px solid green"} : {color:"black"}}>
                            Tech
                        </button>
                        </Link>
                        </nav>
                        <nav className="navbar">
                        <Link to="/">
                        <button className="navbar-brand" value='0' onClick={this.handleChange} style={this.props.activeCategory === '0' ? {color:"green",  borderBottom:"2px solid green"} : {color:"black"}}>
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
                        <Currency onCurrencyChange={this.props.onCurrencyChange}/>
                        
                    <div className="cart-button" onClick={this.toggle} style={{backgroundImage: `url(${Cart})`  }}>
                       {this.props.toggleCount>0 &&  <div className="cart-count">{this.renderTotalItems()}</div> }
                    </div>    
                    <div>
                    {
                    this.props.toggleAns && 
                    <React.Fragment>
                    <CartOverlayList 
                    count={this.props.toggleCount} 
                    product={this.props.product} 
                    currency={this.props.currency} 
                    toDeleteItem={this.props.toDeleteItem}
                    toggle={this.props.toggle}
                    countSelectedItem={this.props.countSelectedItem}
                    />
                    
                    </React.Fragment>
                    } 
                    </div>           
                </div>    
                </div>
            </React.Fragment>
        );
    }
}

export default Navbar;