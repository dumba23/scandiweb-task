import React, {Component} from 'react';
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

      renderTypeText(value){
        if(value.length>=5){
         if(value.indexOf(' ') > 0) {
             return value[0]+value[value.indexOf(' ')+1];
         } return value[0]+value[1]+value[2]
        }else return value;
     }


    render(){  
        return(
            <div className="size-test-content">
                    {
                    this.props.attributes.map((item,index)=>{
                        return (
                            <div className="btnn-sizetest" key={index}>
                                <p>{item.name}:</p>
                                {item.items.map((value,index)=>{
                                    return (
                                    <button
                                    key={index}
                                    value={value.displayValue} 
                                    onClick={e=>{this.props.selectedAttributes(item.id,e.target.value,this.props.itemId); this.handleSelectedAttributes(item.id,e.target.value)}}
                                    style={this.isAttributeActive(item.id, value.displayValue) ? {backgroundColor:`${value.displayValue}`, opacity:'0.5' } :  {backgroundColor:`${value.displayValue}`}}
                                    >
                                        {item.type === 'text' ? this.renderTypeText(value.displayValue) : '' }
                                    </button>
                                    )
                                })}
                            </div>
                        );
                    })
                    }
            </div>
        )
    }
}

export default SizeTest;