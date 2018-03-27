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
            <section className='content'>
                <div className='heading'>
                    <div className='logo'>koa</div>
                    <div className='desc'>next generation web framework for node.js</div>
                </div>
            </section>
        );
    }
}