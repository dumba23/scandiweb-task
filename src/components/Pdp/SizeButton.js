import React, {Component} from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import './SizeButton.css';

export class SizeButton extends Component{
    constructor(props){
        super(props);
        this.handleColor = this.handleColor.bind(this);
        this.state={
            color:null,
            size:null,
        }
    }

    static propTypes = {
        location: PropTypes.object.isRequired,
    };
    
    handleColor(e){
        if(this.props.size.type==="text"){
        this.setState({size:e.target.value})   
        this.props.onSizeChange(e.target.value);
        } 
        if(this.props.size.type === "swatch"){
        this.setState({color:e.target.value}); 
        this.props.onColorChange(e.target.value);
        }
    }   

    render(){  
    const { location } = this.props;
    const handleName = () =>{
        if(location.pathname === "/PDP") {
            return this.props.name
        }
    }
        return(
            <div className="size-container">
                <div className="size">
                    {handleName()}
                    <div className="size-buttons">
                    <div className="size-buttons">
                    {
                        this.props.size.items.map((item) => {
                                return (
                                    <div  key={item.displayValue}>  
                                    <button 
                                    className="size-button" 
                                    value={item.displayValue} 
                                    onClick={this.handleColor}
                                    style={this.state.color === item.displayValue || this.state.size === item.displayValue ? {opacity:'0.4', backgroundColor:`${item.displayValue}` } : {opacity:"", backgroundColor: `${item.displayValue}`}}
                                    >
                                        {this.props.type !== 'swatch' ? item.displayValue : ''}
                                        </button> 
                                    </div>          
                                )
                            })
                    }
                    </div>
                    
                         
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SizeButton);