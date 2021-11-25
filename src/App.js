import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Category from './components/Home/Category';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './components/Header/Navbar';
import Pdp from './components/Pdp/Pdp';
import Cart from './components/Cart/Cart';
import CartOverlayBackground from './components/CartOverlay/CartOverlayBackground';

const client = new ApolloClient({
  uri: 'http://localhost:4000/'
});

export class App extends Component{
  constructor(props){
    super(props);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleItemOpen = this.handleItemOpen.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleSize = this.handleSize.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.toggleHidden = this.toggleHidden.bind(this);
    this.deleteItemFromCartByIndex = this.deleteItemFromCartByIndex.bind(this);
    this.addItemFromCart = this.addItemFromCart.bind(this);
    this.state={
        currency: 'USD',
        category: '',
        item: null,
        addItem: [],
        size: null,
        color: null,
        isHidden:false,
        selectedItem:[],
    };
  }

  addItemFromCart = (itemId,color,size,item) =>{
    this.setState((prevState)=>{
      let updatedCartItems = prevState.addItem.map((element)=>{
        if(element.itemId === itemId && element.color === color && element.size === size){
          return {
            item,
            itemId,
            color,
            size,
            counter: element.counter + 1,
          };
        }
        return element;
      })
      return{
        addItem: updatedCartItems
      }
    }) 
  }

  deleteItemFromCartByIndex(itemId,color,size,item){
    this.setState((prevState)=>{
      let updatedCartItems = prevState.addItem.map((element)=>{
        if(element.itemId === itemId && element.color === color && element.size === size ){
          return {
            item,
            itemId,
            color,
            size,
            counter: element.counter - 1, 
        }
      }
        return element;
      })
      return{
        addItem: updatedCartItems
      }
    }); 
        
  }
  
  toggleHidden(){
    this.setState({isHidden:!this.state.isHidden})
  }

  handleColor(color){
    this.setState({color:color})
  }

  handleSize(size){
    this.setState({size:size})
  }

  handleAddItem = (product, productId) => {
    if(this.state.addItem.length === 0){
      this.setState({addItem:[...this.state.addItem, 
        {
        item:product,
        itemId:productId,
        color:this.state.color,
        size:this.state.size,
        counter:1
      }]})
    }else {
    this.setState((prevState)=>{
      let updatedCartItems = prevState.addItem.map((element)=>{
        if(element.itemId === productId && element.color === this.state.color && element.size === this.state.size){
          return {
            item:product,
            itemId:productId,
            color:this.state.color,
            size:this.state.size,
            counter: element.counter + 1,
          };
        } 
        this.setState({addItem:[...this.state.addItem, 
          {
          item:product,
          itemId:productId,
          color:this.state.color,
          size:this.state.size,
          counter:1
        }]})
      })
      return{
        addItem: updatedCartItems
      }
    }) 
  }
  }

  handleItemOpen(currentItem){
    this.setState({item:currentItem})
  }

  handleCategoryChange(currentCat){
    this.setState({category:currentCat})
  }

  handleCurrencyChange(current){
    this.setState({currency:current})
  }

  componentDidUpdate(){
    this.state.addItem.forEach(element => {
      if(element.counter === 0){
        this.setState({addItem:this.state.addItem.filter(element => element.counter !== 0 )});
      }
    })
  }

  render(){
    return (
      <Router>
        <div className="container">
        <Navbar 
        activeCategory={this.state.category} 
        onCategoryChange={this.handleCategoryChange} 
        onCurrencyChange={this.handleCurrencyChange} 
        toggle={this.toggleHidden} 
        toggleAns={this.state.isHidden} 
        toggleCount={this.state.addItem.length} 
        product={this.state.addItem} 
        currency={this.state.currency}
        color ={this.state.color}
        size ={this.state.size}
        toDeleteItem={this.deleteItemFromCartByIndex}
        countSelectedItem={this.addItemFromCart}
        />
        {
          this.state.isHidden ? 
        <CartOverlayBackground toggle={this.toggleHidden}/>:
        ''
        }
        <ApolloProvider client={client}>
        
            <Route exact path="/"  render = {() => 
            <Category 
            activeCategory={this.state.category} 
            activeCurrency={this.state.currency} 
            onOpen={this.handleItemOpen}/> 
            }/>
            <Route path="/PDP" render = {() => 
            <Pdp 
            product={this.state.item} 
            currency={this.state.currency} 
            onAdd={this.handleAddItem} 
            attributeChoose={this.handleAttributes} 
            handleSize={this.handleSize} 
            handleColor={this.handleColor}/>
            }/>
             <Route path="/Cart" render = {() =>
             <Cart 
             product={this.state.addItem} 
             currency={this.state.currency}
             countSelectedItem={this.addItemFromCart}
             toDeleteItem={this.deleteItemFromCartByIndex}
             />
            }/>
          
        </ApolloProvider>
        </div>
      </Router>
    );
  }
}


export default App;
