/**
 * Created by yi.dai on 2018/2/15.
 */
import { dispatch } from 'dispatch';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import React, { Component } from 'react';
import './NavHeader.css';
import { browserHistory } from 'react-router';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentLink from 'material-ui/svg-icons/content/link';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import Book from 'material-ui/svg-icons/action/book';
import HardwareVideogameAsset from 'material-ui/svg-icons/hardware/videogame-asset';
import TextField from 'material-ui/TextField';
import Message from '../Message/index';
import { logoutAction, searchKeyword, getDocList } from '../../actions/index';

export default class NavHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'open': false,
      'isClickLogout': false,
      'keyword': ''
    };

    this.touchstartY = 0;
  }

  componentDidMount() {
    const slide = document.querySelector('.app-bar');
    window.addEventListener('wheel', (e) => {
      if (e.wheelDelta > 0) {
        console.log('网上滚');
        if (slide && slide.classList.contains('slide-up')) {
          slide.classList.remove('slide-up');
        }
      }
      if (e.wheelDelta < 0) {
        console.log('往下滚');
        if (slide && !slide.classList.contains('slide-up')) {
          slide.classList.add('slide-up');
        }
      }
    }, false);

    window.addEventListener('touchstart', function(event) {
      this.touchstartY = event.changedTouches[0].screenY;// 得到手指按下点的Y轴值
      console.log(this.touchstartY);
    });
    window.addEventListener('touchmove', function(event) {
      if (this.touchstartY > event.changedTouches[0].screenY) {
        console.log('手指向上，页面向下滚');
        if (slide && !slide.classList.contains('slide-up')) {
          slide.classList.add('slide-up');
        }
      } else if (slide && slide.classList.contains('slide-up')) {
        slide.classList.remove('slide-up');
      }
      // 不断监听下拉过程中手指的位置
    });
  }

  componentWillReceiveProps(nextProps) {
    const isLogoutSuccess = nextProps.props.props.loginReducer.responseFlag === true;
    if (this.state.isClickLogout) {
      if (isLogoutSuccess) {
        browserHistory.push('/');
        localStorage.removeItem('token');
      } else {
        //
        this.setState({ 'open': true });
      }
    }
  }

  render() {
    return (
      <div className='nav-header'>
        <AppBar
          style={{ 'paddingLeft': '36px', 'paddingRight': '36px', 'height': '64px' }}
          titleStyle={{ 'fontSize': '16px' }}
          title={<span>I am FridayDai</span>}
          className='app-bar'
          iconElementLeft={<Avatar size={40} className='avatar' />}
                    // iconStyleRight={{'margin': 0, 'padding': 0, 'lineHeight': '64px', 'color': 'white', 'cursor': 'pointer'}}
          iconElementRight={(
              <div>
                <TextField
                    onChange={e => this.setState({ 'keyword': e.target.value })}
                    inputStyle={{ 'color': 'white' }}
                    hintText='Hint Text'
                />
                <RaisedButton
                    buttonStyle={{ 'padding': '1px' }}
                    label='Search'
                    onClick={() => {
                      if(!this.state.keyword || !this.state.keyword.trim()) {
                        dispatch(getDocList());
                      } else {
                        dispatch(searchKeyword(this.state.keyword));
                      }
                    }}
                />
                <IconMenu
                    iconButtonElement={<IconButton><MoreVertIcon color='white' /></IconButton>}
                    anchorOrigin={{ 'horizontal': 'right', 'vertical': 'bottom' }}
                    targetOrigin={{ 'horizontal': 'right', 'vertical': 'top' }}
                >
                  <MenuItem
                      leftIcon={<HardwareVideogameAsset />}
                      primaryText='PROFILE'
                      onClick={() => { browserHistory.push('/profile'); }}
                  />
                  <MenuItem
                      leftIcon={<ContentLink />}
                      primaryText='BLOG'
                      onClick={() => { window.open('https://fridaydai.github.io/'); }}
                  />
                  <MenuItem
                      leftIcon={<Book />}
                      primaryText='WECHAT'
                      onClick={() => { browserHistory.push('/wechat'); }}
                  />
                  <MenuItem
                      leftIcon={<ActionFlightTakeoff />}
                      primaryText='LOG OUT'
                      onClick={() => {
                        this.setState({
                          'isClickLogout': true
                        }, () => {
                          dispatch(logoutAction());
                        });
                      }}
                  />
                </IconMenu>
              </div>
            )}
        />
        <Message
          open={this.state.open}
          textMessage='Logout failed, miss token'
          autoHideDuration={2000}
        />
      </div>
    );
  }
}
