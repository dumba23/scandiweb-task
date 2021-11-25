import React,{ Component } from 'react';
import ProductItem from './ProductItem';
import './ProductList.css';

export class ProductList extends Component {
    Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
        }
    
    render() {
        if(this.props.categoryName === "all"){
            return(
                <div className="container-clothes">
                <div className="title">
                    <h1>{this.Capitalize(this.props.categoryName)}</h1>
                </div>
                <div className="products">
                    {
                this.props.products[0].map((product)=>{
                        return (
                    <ProductItem key={product.name} onOpen={this.props.onOpen} product={product} changeCurrency={this.props.changeCurrency}/>
                        )
                    })
                    }
                    {
                this.props.products[1].map((product)=>{
                        return (
                    <ProductItem key={product.name} onOpen={this.props.onOpen} product={product} changeCurrency={this.props.changeCurrency}/>
                        )
                    })
                    }
                </div>
            </div>
            )
        }else 
        return(
            <div className="container-clothes">
                <div className="title">
                    <h1>{this.Capitalize(this.props.categoryName)}</h1>
                </div>
                <div className="products">
                    {
                this.props.products.map((product)=>{
                    
                        return (
                    <ProductItem onOpen={this.props.onOpen} product={product} changeCurrency={this.props.changeCurrency}/>
                        )
                    })
                    }
                </div>
            </div>
        )
    }
}
export default ProductList