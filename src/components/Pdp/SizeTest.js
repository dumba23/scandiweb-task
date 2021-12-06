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
                                    key={index}
                                    value={value.displayValue} 
                                    onClick={e=>{this.props.selectedAttributes(item.id,e.target.value,this.props.itemId); this.handleSelectedAttributes(item.id,e.target.value)}}
                                    style={this.isAttributeActive(item.id, value.displayValue) && this.props.inStock ? {backgroundColor:`${value.displayValue}`, opacity:'0.5' } :  {backgroundColor:`${value.displayValue}`}}
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