import React , { Component } from 'react';
import { withRouter } from 'react-router-dom';

import CartOverlayItem from './CartOverlayItem';
import CartOverlayItemCounter from './CartOverlayItemCounter';
import CartOverlayItemImg from './CartOverlayItemImg';
import './CartOverlayList.css';


export class CartOverlayList extends Component{
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.itemWasDeletedFromCart = this.itemWasDeletedFromCart.bind(this);
        this.sumOfItem = this.sumOfItem.bind(this);
        this.state={
            deletedItemIndex:null,
            countItems:1,
            isHidden:false,
        }
    }

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

    getTotalPrice(){
        let total = 0 ;
        this.props.product.filter(element =>{
            let price = element.item[0].prices.find(price => price.currency === this.props.currency);
            total += price.amount* element.counter;
            return total;
        })
        return this.handleCurrencies(this.props.currency) + total.toFixed(2);
    }

    sumOfItem(x){
        this.setState({countItems:x});
    }

    itemWasDeletedFromCart(item){
        this.setState({deletedItemIndex:item})
    }

    handleClick(){
        this.props.history.push("/Cart");
        this.setState({isHidden:true});
        this.props.toggle(this.state.isHidden);
    }

    render(){
        if(this.props.product.length === 0){
            return <div className="cart-item">Bag is empty</div>
        }
        return(
            <div className="cart-overlay-list-container">
                    <div className="cart-item">
                    <div style={{paddingLeft:'5px', fontWeight:'bold'}}>My bag, {this.props.count} items</div>
                        {  
                            this.props.product.map((item)=>{
                            return (
                            <div className="cart-overlay-list-content" key={item.itemId}>
                            <CartOverlayItem  
                            product={item} 
                            currency={this.props.currency} 
                            price={item.item[0].prices} 
                            quantity={item.counter}
                            />
                            <CartOverlayItemCounter 
                            itemId={item.itemId}
                            itemSelectedColor={item.color}
                            itemSelectedSize={item.size}
                            item={item}
                            quantity={item.counter}
                            countItems={this.sumOfItem} 
                            id={this.props.product.indexOf(item)} 
                            toDeleteItem={this.itemWasDeletedFromCart} 
                            deleteItem={this.props.toDeleteItem}
                            countSelectedItem={this.props.countSelectedItem}
                            />
                            <CartOverlayItemImg 
                            images={item.item[0].gallery} 
                            width={'105px'} 
                            height={'137px'}/>
                            </div>
                            )
                            })
                        }
                        <div className="cart-overlay-list-total-price" style={{fontWeight:'bold'}}>
                           <div>Total</div>
                          {
                          this.getTotalPrice()
                          }

                        </div> 
                        <div className="cart-overlay-list-buttons">
                        <button onClick={this.handleClick} className="cart-overlay-list-view-bag-button"> VIEW BAG </button>
                        <button onClick={this.handleClick} className="cart-overlay-list-checkout-button"> CHECKOUT </button>
                        </div>
                    </div>
                    <div>

                    </div>
            </div>
        );
    }
}
 
export default withRouter(CartOverlayList);