import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CartOverlaySizeTest.css';

class CartOverlaySizeTest extends Component{
    defaultStylingOnSwatch(type,value){
        if( type === 'swatch'){
            return {
                backgroundColor:value,
                opacity:'0.2'
            }
        }
        if(type === 'text'){
            return {
                opacity:'0.2'
            }
        }
    }

    checkTypeToStyle(type,value){
        if(type === 'swatch'){
            return {
                backgroundColor:value,
                border:'2px solid #1D1F22'
            }
        }return {
            backgroundColor:"#1D1F22",
            color:"white"
        }
    }

    attributeChange(id,value){
        this.props.attrChange(this.props.itemId, this.props.selectedAttributes, this.props.item, id,value)
    }

    isAttributeActive(attrId,attrValue){
        const isActive = this.props.selectedAttributes.find(
            (selectedAttr) => 
                selectedAttr.id === attrId && selectedAttr.value === attrValue
            )
        return Boolean(isActive);
    } 
    
    renderTypeText(value,name){
       if(value.length>=5 && name === "Size"){
        if(value.indexOf(' ') > 0) {
            return value[0]+value[value.indexOf(' ')+1];
        }return value[0]
       }else return value;
    }
 
    render(){
        return(
                <div className="cart-size-test-content">
                    {
                    this.props.allAttributes.map((item,index)=>{
                        return (
                            <div className="cart-size-content" key={index}>
                                {`${item.name}:`}
                                <div className="cart-size-test-buttons">
                                {item.items.map(value=>{ 
                                    return (   
                                    <button
                                    className="cart-buttons-size"
                                    key={value.displayValue}
                                    value={value.displayValue} 
                                    onClick={e => this.attributeChange(item.name,e.target.value,)}
                                    style={
                                        this.isAttributeActive(item.name, value.displayValue) ? 
                                        this.checkTypeToStyle(item.type,value.displayValue) : 
                                        this.defaultStylingOnSwatch(item.type,value.displayValue)     
                                    }
                                    
                                    >
                                        {item.type === 'text' ? this.renderTypeText(value.displayValue,item.name) : null}
                                    </button>
                                    )
                                })}
                                </div>
                            </div>
                        );
                    })
                    }
            </div>
        );
    }
}

CartOverlaySizeTest.propTypes = { 
    selectedAttributes:PropTypes.any,
    attrChange: PropTypes.any,
    itemId: PropTypes.any,
    item: PropTypes.any,
    allAttributes: PropTypes.any,
}

export default CartOverlaySizeTest;