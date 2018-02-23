/**
 * Created by yi.dai on 2017/12/18.
 */
import React, { Component } from 'react';
import {fetchTopics, testAction} from '../actions/index';
import { connect } from 'react-redux';
import NavHeader from '../components/HomePage/NavHeader.js';
import Content from '../components/HomePage/Content.js';
import './HomePage.css';

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // const {dispatch} = this.props;
        // dispatch(testAction());
    }

    render() {
        const {dispatch, fetchTopicsReducer} = this.props;

        return (
            <div className='homepage-content'>
                <NavHeader />
                <Content />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
};

export default connect(mapStateToProps)(HomePage)