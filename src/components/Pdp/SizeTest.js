import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './SizeTest.css';

export class SizeTest extends Component{
    constructor(){
        super()
        this.state = {
            selectedAttributes:[]
        }
    }

    defaultStylingOnSwatch(type,value){
        if( type === 'swatch'){
            return {
                backgroundColor:value
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

    isAttributeActive(attrId,attrValue){
        const isActive = this.state.selectedAttributes.find(
            (selectedAttr) => 
                selectedAttr.id === attrId && selectedAttr.value === attrValue
            )
        return Boolean(isActive);
    }

    handleSelectedAttributes(id,value){
        this.setState((prevState) => ({
          selectedAttributes: prevState.selectedAttributes.some((thingy) => thingy.id === id)
            ? prevState.selectedAttributes.map((thingy) =>
                thingy.id === id ? { ...thingy, value } : thingy
              )
            : prevState.selectedAttributes.concat({ id, value }),
        }));
      }

      renderTypeText(value,name){
        if(value.length>=5 && name === "Size"){
         if(value.indexOf(' ') > 0) {
             return value[0]+value[value.indexOf(' ')+1];
         } return value[0]
        }else return value;
     }

    render(){  
        return(
            <div >
                    {
                    this.props.attributes.map((item,index)=>{
                        return (
                            <div className="size-test-content" key={index}>
                                {`${item.name.toUpperCase()}:`}
                            <div className="btnn-sizetest">
                                {item.items.map((value,index)=>{
                                    return (
                                    <button
                                    className="size-btns"
                                    key={index}
                                    value={value.displayValue} 
                                    onClick={e=>{this.props.selectedAttributes(item.id,e.target.value,this.props.itemId); this.handleSelectedAttributes(item.id,e.target.value)}}
                                    style=
                                    {this.isAttributeActive(item.id, value.displayValue) && this.props.inStock ? 
                                        this.checkTypeToStyle(item.type,value.displayValue) :  
                                        this.defaultStylingOnSwatch(item.type,value.displayValue)}
                                    >
                                        {item.type === 'text' ? this.renderTypeText(value.displayValue,item.name) : '' }
                                    </button>
                                    )
                                })}
                            </div>
                            </div>
                        );
                    })
                    }
            </div>
        )
    }
}

SizeTest.propTypes = {
    attributes:PropTypes.array,
    selectedAttributes: PropTypes.func,
    itemId: PropTypes.string,
    inStock: PropTypes.bool
}


export default SizeTest;