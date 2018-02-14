/**
 * Created by yi.dai on 2017/12/18.
 */
import React, { Component } from 'react';
import {fetchTopics, testAction} from '../actions/index';
import { connect } from 'react-redux';

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(testAction());
    }

    render() {
        const {dispatch, fetchTopicsReducer} = this.props;
        const tabData = (fetchTopicsReducer.data && fetchTopicsReducer.data.data) || [];
        return (
            <div>
                <div style={{'textAlign': 'center'}}>
                    <button
                        style={{'width': '500px', 'height': '300px', 'fontSize': '36px', 'cursor': 'pointer'}}
                        onClick={() => dispatch(fetchTopics('ask', 1, 10))}
                    >
                        Click to Test
                    </button>
                </div>

                {
                    tabData.map((item) => (
                        <div>
                            <h3><img src={item.author.avatar_url} alt={item.author.loginname || 'loginname'}/>{item.title}</h3>
                            <div>{item.content}</div>
                        </div>
                    ))
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
};

export default connect(mapStateToProps)(HomePage)