import React, { Component } from 'react';
import './CartOverlaySizeTest.css';

class CartOverlaySizeTest extends Component{
    attributeChange(){
        this.props.attrChange(this.props.itemId, this.props.selectedAttributes, this.props.item)
    }

    isAttributeActive(attrId,attrValue){
        const isActive = this.props.selectedAttributes.find(
            (selectedAttr) => 
                selectedAttr.id === attrId && selectedAttr.value === attrValue
            )
        return Boolean(isActive);
    } 
    
    renderTypeText(value){
       if(value.length>=5){
        if(value.indexOf(' ') > 0) {
            return value[0]+value[value.indexOf(' ')+1];
        } return value[0]+value[1]+value[2]
       }else return value;
    }

    render(){
        console.log(this.props.selectedAttributes)
        return(
            <div>
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
                                    onClick={e => {this.attributeChange(); this.props.selectedAttr(item.name,e.target.value,this.props.itemId) }}
                                    style={
                                        this.isAttributeActive(item.name, value.displayValue) ? { backgroundColor:`${value.displayValue}`, opacity:'0.4'} : {backgroundColor:`${value.displayValue}`}
                                        
                                    }
                                    
                                    >
                                        {item.type === 'text' ? this.renderTypeText(value.displayValue) : null}
                                    </button>
                                    )
                                })}
                                </div>
                            </div>
                        );
                    })
                    }
            </div>
            </div>
        );
    }
}

export default CartOverlaySizeTest;