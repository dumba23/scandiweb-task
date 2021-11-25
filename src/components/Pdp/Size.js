import React, {Component} from 'react';
import SizeButton from './SizeButton';

export class Size extends Component {
    render(){
        if(this.props.size.length === 2 && this.props.size[0].type === 'text'){
            return( 
                <div>
                <SizeButton size={this.props.size[0]} type={'text'} typeLength={this.props.size.length} name={'Size:'} onSizeChange={this.props.onSizeChange} onColorChange={this.props.onColorChange}/>
                <SizeButton size={this.props.size[1]} type={'swatch'} typeLength={this.props.size.length} name={'Color:'} onSizeChange={this.props.onSizeChange} onColorChange={this.props.onColorChange}/>
                </div>
            );
        }else if(this.props.size.length === 2 && this.props.size[0].type === 'swatch'){
        return(
                <div>
                    <SizeButton size={this.props.size[0]} type={'swatch'} typeLength={this.props.size.length} name={'Color:'} onSizeChange={this.props.onSizeChange} onColorChange={this.props.onColorChange}/>
                    <SizeButton size={this.props.size[1]} type={'text'} typeLength={this.props.size.length} name={'Size:'} onSizeChange={this.props.onSizeChange} onColorChange={this.props.onColorChange}/>
                </div>
        )}else if (this.props.size.length === 3){
            return <SizeButton size={this.props.size[0]} type={'text'} typeLength={1} name={'Size:'} onSizeChange={this.props.onSizeChange} onColorChange={this.props.onColorChange}/>
        }
        if(this.props.size.length === 1){
            return <SizeButton size={this.props.size[0]} typeLength={1} name={'Size:'} onSizeChange={this.props.onSizeChange} onColorChange={this.props.onColorChange}/>
        }
    }
}
  
export default Size;