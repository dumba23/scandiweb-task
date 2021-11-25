import React,{ Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ProductList from './ProductList';
import './Category.css'

const CATEGORIES_QUERY = gql`
    query CategoryQuery{
        categories {
            name
            products {
              id
              name
              inStock
              gallery
              description
              prices {
                amount
                currency
                }
            attributes {
                type
                items {
                    displayValue
                    }
                }
            }
        }
    }
`;

export class Category extends Component {

render() { 
    return(          
        <div className="container-products">
            <Query query={CATEGORIES_QUERY}>
                {
                    ({ loading, error, data })=>{
                        if(loading) return <h4>Loading...</h4>
                        if(error) console.log(error);
                        if(this.props.activeCategory === ""){
                            return (
                                <ProductList 
                                onOpen={this.props.onOpen}
                                products={[data.categories[0].products, data.categories[1].products]} 
                                categoryName={"all"} 
                                changeCurrency={this.props.activeCurrency}
                                />                                
                            )
                        }else 
                        return (
                           <ProductList onOpen={this.props.onOpen} products={data.categories[this.props.activeCategory].products} categoryName={data.categories[this.props.activeCategory].name} changeCurrency={this.props.activeCurrency}/>
                        );
                    }
                }
            </Query>
        </div>      
    )
}
}

export default Category