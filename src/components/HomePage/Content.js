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
                <p>
                    INSPIRATION
                </p>
                <p>
                    THROUGH
                </p>
                <p>
                    EXPLORATION
                </p>
            </div>
        );
    }
}