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
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentLink from 'material-ui/svg-icons/content/link';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';

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
                    titleStyle={{'fontSize': '16px'}}
                    title={<span>I'm FridayDai</span>}
                    className='app-bar'
                    iconElementLeft={<Avatar size={40} className="avatar" />}
                    // iconStyleRight={{'margin': 0, 'padding': 0, 'lineHeight': '64px', 'color': 'white', 'cursor': 'pointer'}}
                    iconElementRight={
                        <IconMenu
                            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                        >
                            <MenuItem 
                                leftIcon={<ContentLink />} 
                                primaryText="BLOG"
                                onClick={() => { window.open('https://fridaydai.github.io/');}}
                            />
                            <MenuItem 
                                leftIcon={<ActionFlightTakeoff />} 
                                primaryText="LOG OUT"
                                onClick={() => {
                                    this.props.dispatch(logoutAction());
                                }}
                            />
                        </IconMenu>   
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