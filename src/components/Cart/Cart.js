import React, {Component} from 'react';
import CartOverlayItem from '../CartOverlay/CartOverlayItem';
import CartOverlayItemCounter from '../CartOverlay/CartOverlayItemCounter';
import CartOverlayItemImg from '../CartOverlay/CartOverlayItemImg';
import './Cart.css';

export class Cart extends Component{
    constructor(props){
        super(props)
        this.itemWasDeletedFromCart = this.itemWasDeletedFromCart.bind(this);
        this.sumOfItem = this.sumOfItem.bind(this);
        this.state={
            deletedItemIndex:null,
            countItems:1,
        }
    }

    sumOfItem(x){
        this.setState({countItems:x})
    }

    itemWasDeletedFromCart(item){
        this.setState({deletedItemIndex:item})
    }

    render(){
        return(
            <div>
                  <div className="cart-name">CART</div>    
                {
                this.props.product.map((item)=>{
                            return (
                            <div className='cart-content' key={item.itemId}>
                            <div className="cart-content-left" key={item.item[0].name}>
                            <CartOverlayItem  product={item} currency={this.props.currency} price={item.item[0].prices} />
                            </div>
                            <div className="cart-content-right">
                            <div className="cart-counter">
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
                                </div>
                            <div className="cart-img"><CartOverlayItemImg images={item.item[0].gallery} width={'151px'} height={'185px'}/></div>
                            </div>
                            </div>
                            )
                            })
                }
            </div>
        );
    }
}

export default Cart;