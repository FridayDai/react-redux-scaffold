/**
 * Created by yi.dai on 2018/2/15.
 */
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import React, {Component} from 'react';
import './NavHeader.css';
import {logoutAction} from '../../actions/index';
import { browserHistory } from 'react-router';
import Message from '../Message/index';

export default class NavHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'open': false
        };
    }

    componentWillReceiveProps(nextProps) {
        const isLogoutSuccess = nextProps.props.props.loginReducer.responseFlag === true;
        if(isLogoutSuccess) {
            browserHistory.push('/');
            localStorage.removeItem('token');
        } else {
            //
            this.setState({'open': true});
        }
    }

    render() {
        return (
            <div className='nav-header'>
                <AppBar
                    style={{'paddingLeft': '36px', 'paddingRight': '36px', 'height': '64px'}}
                    title={
                        <div>
                            <span>I'm FridayDai</span>
                        </div>
                    }
                    className='app-bar'
                    iconElementLeft={<Avatar size={40} className="avatar" />}
                    iconStyleRight={{'margin': 0, 'padding': 0, 'lineHeight': '64px', 'color': 'white', 'cursor': 'pointer'}}
                    iconElementRight={
                        <div>
                            <span
                                onClick={() => {
                                    window.open('https://fridaydai.github.io/');
                                }}
                            >
                                BLOG
                            </span>
                            <span
                                style={{'marginLeft': '30px'}}
                                onClick={() => {
                                    this.props.dispatch(logoutAction());
                                }}
                            >
                                LOG OUT
                            </span>
                        </div>
                    }
                />
                <Message
                    open={this.state.open}
                    textMessage={'Logout failed, miss token'}
                    autoHideDuration={2000}
                />
            </div>
        );
    }
}