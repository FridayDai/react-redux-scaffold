/**
 * Created by yi.dai on 2018/2/26.
 */
import React, { Component } from 'react';
import { dispatch } from 'dispatch';
import './LoginComponent.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import { newLoginAction } from '../../actions/index';
import { encryptPwd, deleteCookie } from '../../util/common';
import Message from '../Message/index';

export default class LoginComponent extends Component {
  static handleLoginInWithoutPassword() {
    deleteCookie('token');
    browserHistory.push('/homepage');
  }

  constructor(props) {
    super(props);

    this.state = {
      'open': false,
      'UserName': '',
      'errorTextForUserName': '',
      'Password': '',
      'errorTextForPassword': ''
    };
  }

  componentDidMount() {
    const btn = document.querySelector('.mouse-cursor-gradient-tracking');
    btn.onmousemove = function(e) {
      const x = e.pageX - btn.offsetLeft;
      const y = e.pageY - btn.offsetTop;
      btn.style.setProperty('--x', `${x}px`);
      btn.style.setProperty('--y', `${y}px`);
    };
  }

  async handleLoginIn() {
    if (this.state.UserName && this.state.Password) {
      const loginRes = await dispatch(newLoginAction(this.state.UserName, encryptPwd(this.state.Password)));
      if(loginRes.code === 10000) {
        browserHistory.push('/homepage');
      } else {
        this.setState({
          'errorTextForUserName': '用户名可能不存在',
          'errorTextForPassword': '密码错误'
        });
      }
    } else {
      this.setState({ 'open': true }, () => {
        setTimeout(() => {
          this.setState({ 'open': false });
        }, 2000);
      });
    }
  }

  render() {
    return (
      <div className='login-component'>
        <div className='login-form'>
          <div>
            <h1>Sign In</h1>
          </div>
          <div>
            <TextField
              id='UserName'
              hintText='UserName Field'
              floatingLabelText='UserName'
              errorText={this.state.errorTextForUserName}
              fullWidth={true}
              onChange={(e, value) => {
                if (!value) {
                  this.setState({ 'errorTextForUserName': 'Please Input UserName' });
                } else {
                  this.setState({ 'errorTextForUserName': '' });
                }
                this.setState({ 'UserName': value });
              }}
            />
          </div>
          <div>
            <TextField
              id='Password'
              hintText='Password Field'
              floatingLabelText='Password'
              errorText={this.state.errorTextForPassword}
              fullWidth={true}
              type='password'
              onChange={(e, value) => {
                if (!value) {
                  this.setState({ 'errorTextForPassword': 'Please Input Password' });
                } else {
                  this.setState({ 'errorTextForPassword': '' });
                }
                this.setState({ 'Password': value });
              }}
            />
          </div>
          <div>
            <RaisedButton
              label='Login In'
              primary={true}
              className='login-button'
              onClick={() => this.handleLoginIn()}
            />
            <button
              className='login-button mouse-cursor-gradient-tracking'
              onClick={() => LoginComponent.handleLoginInWithoutPassword()}
            >
              <span>Login In Without Password</span>
            </button>
          </div>
        </div>
        <Message
          open={this.state.open}
          textMessage='Logout failed!'
          autoHideDuration={2000}
        />
      </div>
    );
  }
}
