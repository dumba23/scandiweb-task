import React, {Component} from 'react';
import { Query } from 'react-apollo';
import { PDP_QUERY } from '../../queries';
import Gallery from './Gallery';
import Price from './Price';
import AddButton from './AddButton';
import './Pdp.css';
import SizeTest from './SizeTest';
import DOMPurify from 'dompurify'

export class Pdp extends Component{
    cleanData(descr){
        return DOMPurify.sanitize(descr)
    }
    
    render(){
        if(this.props.product){
            const { id } = this.props.product;
            return(
                <div className="item-container">
                    <Query query={PDP_QUERY} variables={{productId:id}}>
                        {
                        ({loading,data,error})=>{
                            if (loading) return 'loading';
                            if(error) console.log(error);
                            if(data){
                                return (
                                        <div className="item-container-1">
                                            <Gallery gallery={data.product.gallery}/>
                                            <div className="details">
                                                <div className="item-name">
                                                <p style={{fontWeight:'bold'}}>{this.props.product.brand}</p>
                                                <p>{this.props.product.name}</p>
                                                </div>
                                                <div className="item-name">
                                                <SizeTest attributesToStyle={this.props.attributesToStyle} itemId={data.product.id} selectedAttributes={this.props.selectedAttributes} attributes={data.product.attributes}/>
                                                </div>
                                                <div className="item-name">
                                                <Price price={this.props.product.prices} currency={this.props.currency}  quantity={1}/>
                                                </div>
                                                <div className="add-button" >
                                                <AddButton selectedAttributes={this.props.attributes} clearSelectedAttributes={this.props.clearSelectedAttributes} product={this.props.product} inStock={this.props.product.inStock} onAdd={this.props.onAdd} onClick={this.cutArr}/>
                                                </div>
                                                <div className="description"
                                                dangerouslySetInnerHTML={{__html: this.cleanData(this.props.product.description)}}  
                                                />                                           
                                            </div>
                                        </div>
                                    );
                                }
                            }
                        }
                    </Query> 
                </div>
            );
        }return <h4>Go to home page</h4>
    }
}

export default Pdp;