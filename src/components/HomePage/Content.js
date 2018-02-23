/**
 * Created by yi.dai on 2018/2/15.
 */
import React, {Component} from 'react';
import './Content.css';

export default class Content extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='content'>
                <p className='fade content-a'>
                    INSPIRATION
                </p>
                <p className='fade content-b'>
                    THROUGH
                </p>
                <p className='fade content-c'>
                    EXPLORATION
                </p>
            </div>
        );
    }
}