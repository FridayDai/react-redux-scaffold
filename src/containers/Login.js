/**
 * Created by yi.dai on 2018/2/26.
 */
import React, {Component} from 'react';
import { connect } from 'react-redux';
import LoginComponent from '../components/Login/LoginComponent';

class Login extends Component {
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

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(Login);