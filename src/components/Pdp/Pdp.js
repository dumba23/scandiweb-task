import React, {Component} from 'react';
import Gallery from './Gallery';
import Size from './Size';
import Price from './Price';
import AddButton from './AddButton';
import './Pdp.css';
 
export class Pdp extends Component{
    render(){
            return(
                <div className="item-container">
                    <div className="item-container-1">
                    <Gallery gallery={this.props.product.gallery}/>
                    <div className="details">
                        <div className="item-name">
                        <p>{this.props.product.name}</p>
                        </div>
                        <div className="item-name">
                        <Size size={this.props.product.attributes} onSizeChange={this.props.handleSize} onColorChange={this.props.handleColor}/>
                        </div>
                        <div className="item-name">
                        <Price price={this.props.product.prices} currency={this.props.currency}  quantity={1}/>
                        </div>
                        <div className="add-button" >
                        <AddButton product={this.props.product} inStock={this.props.product.inStock} onAdd={this.props.onAdd} onClick={this.cutArr}/>
                        </div>
                        <div className="description"
                        dangerouslySetInnerHTML={{__html: this.props.product.description}}  
                        />
                    </div>
                    </div>
                </div>
        );
    }
}

export default Pdp;