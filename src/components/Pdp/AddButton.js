import React, {Component} from 'react';
import './AddButton.css';

export class AddButton extends Component{
    constructor(props){
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd(){
        const finalProduct=[this.props.product]
        let productId = this.props.product.id;
        this.props.onAdd(finalProduct,productId,this.props.selectedAttributes);      
    }

    render(){
        if(this.props.inStock){
        return(
            <div>
                <button className="add-to-cart" onClick ={ this.handleAdd}>
                    ADD TO CART
                </button>
            </div>
        );
        }else 
        return (
            <div>
                <button className="add-to-cart-disabled" disabled={true}>
                    OUT OF STOCK
                </button>
            </div>
            );
    }
}


export default AddButton;