/**
 * Created by yi.dai on 2018/2/26.
 */
import React, { Component } from 'react';
import './LoginComponent.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {loginAction} from '../../actions/index';
import { browserHistory } from 'react-router';

export default class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'UserName': '',
            'errorTextForUserName': '',
            'Password': '',
            'errorTextForPassword': ''
        };
    }

    componentWillReceiveProps(newProps){
        const props = newProps.props;
        if(props.loginReducer && props.loginReducer.responseFlag === true) {
            // 登陆成功
            browserHistory.push('/homepage');
            localStorage.setItem('username', props.loginReducer.responseObject.username);
        } else {
            this.setState({
                'errorTextForUserName': '用户名可能不存在',
                'errorTextForPassword': '密码错误'
            });
        }
    }

    handleLoginIn() {
        const dispatch = this.props.props.dispatch;

        if(this.state.UserName && this.state.Password) {
            //action
            dispatch(loginAction(this.state.UserName, this.state.Password));
        }
    }

    render() {
        return(
            <div className='login-component'>
                <div className='login-form'>
                    <div>
                        <h1>Sign In</h1>
                    </div>
                    <div>
                        <TextField
                            id='UserName'
                            hintText="UserName Field"
                            floatingLabelText="UserName"
                            errorText={this.state.errorTextForUserName}
                            onChange={(e, value) => {
                                if(!value) {
                                    this.setState({'errorTextForUserName': 'Please Input UserName'});
                                } else {
                                    this.setState({'errorTextForUserName': ''});
                                }
                                this.setState({'UserName': value});
                            }}
                        />
                    </div>
                    <div>
                        <TextField
                            id='Password'
                            hintText="Password Field"
                            floatingLabelText="Password"
                            errorText={this.state.errorTextForPassword}
                            type="password"
                            onChange={(e, value) => {
                                if(!value) {
                                    this.setState({'errorTextForPassword': 'Please Input Password'});
                                } else {
                                    this.setState({'errorTextForPassword': ''});
                                }
                                this.setState({'Password': value});
                            }}
                        />
                    </div>
                    <div>
                        <RaisedButton
                            label="Login In"
                            primary={true}
                            className="login-button"
                            onClick={() => this.handleLoginIn()}
                        />
                    </div>
                </div>
            </div>
        );
    }
}