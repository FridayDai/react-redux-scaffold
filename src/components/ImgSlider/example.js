/**
 * Created by yi.dai on 2018/6/20.
 */
import React, {Component} from 'react';
import ImgSlider from 'index.js';

const imgs = [
    {
        'src': '/img/img10.png',
        'alt': '10'
    },
    {
        'src': '/img/monitor.png',
        'alt': 'monitor'
    }
];

export default class Example extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <ImgSlider
                imgs={imgs}
                // speed={2}
                // autoplay={true}
                dots={true}
                arrows={true}
            />
        );
    }
}