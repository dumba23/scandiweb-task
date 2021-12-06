import React , { Component } from 'react';
import PropTypes from 'prop-types';
import './Gallery.css';

export class Gallery extends Component{
    constructor(props){
        super(props);
        this.state={
            currentSrc: this.props.gallery[0],
        }
    }

    handleChange(param){
        this.setState({currentSrc:param})
    }

    render(){
        return(
            <div className="items-container">
                <div className="items-left">
                    {
                    this.props.gallery.map((item)=>{
                        return <div className="item-left" key={item} value={item} onClick={e=>this.handleChange(e.target.src)}>
                                <img alt="product" src={item} max-width="120px" height="100px"></img>
                                </div>
                    })
                    }
                </div>
                <div className="item-main">
                    {
                    <img alt="product" src={this.state.currentSrc} max-width="610px" height="511px"></img>
                    }
                </div>
            </div>
        );
    }
}

Gallery.propTypes = {
    gallery: PropTypes.array
}


export default Gallery;