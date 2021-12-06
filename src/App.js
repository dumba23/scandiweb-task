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
})

export class App extends Component{
  constructor(props){
    super(props);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleItemOpen = this.handleItemOpen.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.toggleHidden = this.toggleHidden.bind(this);
    this.deleteItemFromCartByIndex = this.deleteItemFromCartByIndex.bind(this);
    this.addItemFromCart = this.addItemFromCart.bind(this);
    this.toggleCurrencySwitcherHide = this.toggleCurrencySwitcherHide.bind(this);
    this.handleSelectedAttributes = this.handleSelectedAttributes.bind(this);
    this.attributeChangeFromCart = this.attributeChangeFromCart.bind(this);
    this.clearSelectedAttriute = this.clearSelectedAttriute.bind(this);
    this.state={
        currency: 'USD',
        category: '',
        item: null,
        addItem: [],
        isHidden:false,
        isCurrencySwitcherHidden:false,
        selectedAttributes:[],
    };
  }

  clearSelectedAttriute(){
    this.setState({selectedAttributes:[]})
  }

  attributeChangeFromCart(itemId, selected, item, id, value){
    const a = selected;
    const updatedAttributes =  a.some((thingy) => thingy.id === id)
        ? a.map((thingy) =>
            thingy.id === id ? { ...thingy, value, itemId } : thingy
          )
        : a.concat({ id, value, itemId })

    this.setState((prevState)=>{     
    let updatedCartItems = prevState.addItem.map((element)=>{

        const isSame = element.selectedAttributes.find(
          attr => 
               selected.find(
                selectedAttr =>
                 attr.id === selectedAttr.id && attr.value === selectedAttr.value
              )
        )
        
        if(element.itemId === itemId && Boolean(isSame)) {
          return{
            item,
            itemId,
            selectedAttributes:updatedAttributes,
            counter:element.counter,
          }
        }
        return element
         
      })
      return{
        addItem: updatedCartItems
      }
    })
  }

  handleSelectedAttributes(id,value,itemId){
    this.setState((prevState) => ({
      selectedAttributes: prevState.selectedAttributes.some((thingy) => thingy.id === id)
        ? prevState.selectedAttributes.map((thingy) =>
            thingy.id === id ? { ...thingy, value, itemId } : thingy
          )
        : prevState.selectedAttributes.concat({ id, value, itemId }),
    }));
  }

  addItemFromCart  (itemId,selected,item) {
    this.setState((prevState)=>{
      let updatedCartItems = prevState.addItem.map((element)=>{
        const isSame = element.selectedAttributes.find(
          attr => 
               selected.find(
                selectedAttr =>
                 attr.id === selectedAttr.id && attr.value === selectedAttr.value,
              )
        )
        if(element.itemId === itemId && element.selectedAttributes.length === 0){
          return{
            item,
            itemId,
            selectedAttributes:selected,
            counter: element.counter + 1, 
          }
        }
        if(element.itemId === itemId && Boolean(isSame)){
          return {
            item,
            itemId,
            selectedAttributes:selected,
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

  deleteItemFromCartByIndex(itemId,selected,item){
    this.setState((prevState)=>{
      let updatedCartItems = prevState.addItem.map((element)=>{
        const isSame = element.selectedAttributes.find(
          attr => 
               selected.find(
                selectedAttr =>
                 attr.id === selectedAttr.id && attr.value === selectedAttr.value,
              )
        )
        if(element.itemId === itemId && element.selectedAttributes.length === 0){
          return{
            item,
            itemId,
            selectedAttributes:selected,
            counter: element.counter - 1, 
          }
        }
        if(element.itemId === itemId && Boolean(isSame)){
          return {
            item,
            itemId,
            selectedAttributes:selected,
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
  
  toggleCurrencySwitcherHide(){
    this.setState({isCurrencySwitcherHidden:!this.state.isCurrencySwitcherHidden})
  }

  toggleHidden(){
    this.setState({isHidden:!this.state.isHidden})
  }

  handleAddItem  (product, itemId, selected)  {
    const attributeSortFunc = ( a, b ) => {
      if ( a.id < b.id ){
        return -1;
      }
      if ( a.id > b.id ){
        return 1;
      }
      return 0;
    }

    const compareAttributes = (attrs, attrs2) => {
      for (const key in attrs) {
        if (attrs[key] !== attrs2[key]){
          return false;
        }
      }
      return true;
    }

    this.setState((prevState) => {

        const foundIndex = prevState.addItem.findIndex(item =>{
          if(item.selectedAttributes.length !== selected.length) return false;

          const sortedAttributes = item.selectedAttributes.sort(attributeSortFunc);
          const sortedNewAttributes = selected.sort(attributeSortFunc);

          for(let i = 0; i < sortedAttributes.length; i++){
            if(!compareAttributes(sortedAttributes[i], sortedNewAttributes[i])){
              return false;
            }
          }
          return true;
          
        });

          const updatedItemsArr = prevState.addItem.map((item, i) => {
            if(i === foundIndex){
                return ({
                    ...item,
                    counter: item.counter + 1
                })
            }

            return item;
        })

        if(foundIndex === -1){
            updatedItemsArr.push({
                item:product,
                itemId:itemId,
                selectedAttributes:selected,
                counter:1
            })
        }

        return ({
            addItem: updatedItemsArr
        })

    });
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
        <ApolloProvider client={client}>
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
        toDeleteItem={this.deleteItemFromCartByIndex}
        countSelectedItem={this.addItemFromCart}
        currencySwitcher={this.toggleCurrencySwitcherHide}
        currencyOpen={this.state.isCurrencySwitcherHidden}
        attrChangeFromCart={this.attributeChangeFromCart}
        selectedAttributes={this.handleSelectedAttributesFromCart} 
        />
        {
          this.state.isHidden ? 
        <CartOverlayBackground toggle={this.toggleHidden}/>:
        ''
        }
            <Route exact path="/"  render = {() => 
            <Category 
            activeCategory={this.state.category} 
            activeCurrency={this.state.currency} 
            onOpen={this.handleItemOpen}/> 
            }/>
            <Route path="/PDP" render = {() => 
            <Pdp
            clearAttributes={this.clearSelectedAttriute}
            attributesToStyle={this.state.selectedAttributes}
            attributes={this.state.selectedAttributes}
            selectedAttributes={this.handleSelectedAttributes} 
            product={this.state.item} 
            currency={this.state.currency} 
            onAdd={this.handleAddItem} 
            attributeChoose={this.handleAttributes} 
            />
            }/>
             <Route path="/Cart" render = {() =>
             <Cart 
             attrChange={this.attributeChangeFromCart}
             selectedAttributes={this.handleSelectedAttributes} 
             product={this.state.addItem} 
             currency={this.state.currency}
             countSelectedItem={this.addItemFromCart}
             toDeleteItem={this.deleteItemFromCartByIndex}
             />
            }/>
        </div>
        </ApolloProvider>
      </Router>
    );
  }
}

export default App;