/**
 * Created by yi.dai on 2018/6/19.
 */
import React, { Component } from 'react';

export default class Item extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='slider-item' style={{'left': this.props.left}}>
                <img
                    src={this.props.src}
                    alt={this.props.alt}
                    width={this.props.width}
                    height={this.props.height}
                    style={this.props.imgStyle}
                />
            </div>
        );
    }
}

Item.defaultProps = {
    'src': '',
    'alt': '',
    'width': '200px',
    'height': '160px',
    'imgStyle': {},
    'count': 1
};