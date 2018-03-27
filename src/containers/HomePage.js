/**
 * Created by yi.dai on 2017/12/18.
 */
import React, { Component } from 'react';
import {fetchTopics, testAction} from '../actions/index';
import { connect } from 'react-redux';
// import NavHeader from '../components/HomePage/NavHeader.js';
// import Content from '../components/HomePage/Content.js';
import Pages from '../components/HomePage/Pages';
import './HomePage.css';
import {checkToken} from '../util/common';
import '../common/style.css';

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // const {dispatch} = this.props;
        // dispatch(testAction());

        checkToken();
    }

    render() {
        const {dispatch, fetchTopicsReducer} = this.props;

        return (
            <div className='homepage-content'>
                <Pages
                    props={this.props}
                    dispatch={dispatch}
                    currentPage={(currentPage) => {
                        const doms = document.querySelectorAll('.sideBar-item');

                        for(let i = 0; i < doms.length; i++) {
                            if(currentPage === (i + 1)) {
                                if(doms[i].className.indexOf('current') === -1) {
                                    doms[i].className += ' current';
                                }
                            } else {
                                doms[i].className = 'sideBar-item';
                            }
                        }
                    }}
                />
                <div className='sideBar'>
                    <ul>
                        <li className='sideBar-item current'></li>
                        <li className='sideBar-item'></li>
                        <li className='sideBar-item'></li>
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(HomePage)
