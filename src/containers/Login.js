/**
 * Created by yi.dai on 2018/2/26.
 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import LoginComponent from '../components/Login/LoginComponent';

class Login extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <LoginComponent
                props={this.props}
            />
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Login);
