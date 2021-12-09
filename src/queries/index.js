import gql from 'graphql-tag';

export const PDP_QUERY = gql`
    query Query($productId: String!){
    product(id:$productId){
        id
        name
        inStock
        gallery
        description
        category
        attributes {
            id
            name
            type
            items {
                displayValue    
            }
        }
        brand
        prices {
            amount
            currency
        }
    }
}
`;

export const CATEGORIES = gql`
query Query($input: String!) {
    category(input:{title: $input}) {
      name
      products {
        name
        id
        inStock
        gallery
        description
        prices {
          currency
          amount
        }
        attributes {
          name
          type
          items {
            displayValue
          }
        }
        brand
      }
    }
  }
`;

export const CURRENCIES = gql`
  query getCurrencies {
    currencies
  }
`;