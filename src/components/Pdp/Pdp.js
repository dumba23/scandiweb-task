import React, {Component} from 'react';
import { Query } from 'react-apollo';
import { PDP_QUERY } from '../../queries';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";

import Gallery from './Gallery';
import Price from './Price';
import AddButton from './AddButton';
import './Pdp.css';
import SizeTest from './SizeTest';
import DOMPurify from 'dompurify'

export class Pdp extends Component{
    componentWillUnmount(){
        this.props.clearAttributes();
    }

    cleanData(descr){
        return DOMPurify.sanitize(descr)
    }
    
    render(){
        const { location } = this.props;
        const  id  = location.pathname.slice(5);
        if(id){
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
                                                <p style={{fontWeight:'bold'}}>{data.product.brand}</p>
                                                <p>{data.product.name}</p>
                                                </div>
                                                <div className="item-name">
                                                <SizeTest inStock={data.product.inStock} attributesToStyle={this.props.attributesToStyle} itemId={data.product.id} selectedAttributes={this.props.selectedAttributes} attributes={data.product.attributes}/>
                                                </div>
                                                <div className="item-name">
                                                <Price price={data.product.prices} currency={this.props.currency}  quantity={1}/>
                                                </div>
                                                <div className="add-button" >
                                                <AddButton selectedAttributes={this.props.attributes} product={data.product} inStock={data.product.inStock} onAdd={this.props.onAdd} onClick={this.cutArr}/>
                                                </div>
                                                <div className="description"
                                                dangerouslySetInnerHTML={{__html: this.cleanData(data.product.description)}}  
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

Pdp.propTypes = {
    attributesToStyle: PropTypes.array,
    selectedAttributes: PropTypes.func,
    currency: PropTypes.string,
    attributes: PropTypes.array,
    onAdd: PropTypes.func,
    clearAttributes: PropTypes.func,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}


export default withRouter(Pdp);