import React,{ Component } from 'react';
import { Query } from 'react-apollo';
import { CATEGORIES } from '../../queries';
import PropTypes from 'prop-types';

import ProductList from './ProductList';
import './Category.css'

export class Category extends Component {
    render() { 
        const { activeCategory } = this.props;
        return(          
            <div className="container-products">
                <Query query={CATEGORIES}  variables={{input:activeCategory}}>
                    {
                        ({ loading, error, data })=>{
                            if(loading) return <h4>Loading...</h4>
                            if(error) console.log(error);
                            if(data){
                                return (
                                    <ProductList 
                                    onOpen={this.props.onOpen}
                                    products={data.category.products} 
                                    categoryName={data.category.name} 
                                    changeCurrency={this.props.activeCurrency}
                                    />                                
                                )
                            }
                        }
                    }
                </Query>
        </div>      
        )
    }
}

Category.propTypes = {
    activeCategory: PropTypes.string,
    onOpen: PropTypes.func,
    activeCurrency: PropTypes.string
}

export default Category