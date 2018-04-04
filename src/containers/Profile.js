/**
 * Created by yi.dai on 2018/4/3.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../common/style.css';
import Phone from '../components/Profile/Phone';

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                style={{'height': '100%', 'backgroundColor': '#e9fbf8'}}
                // className='center-center'
            >
                <Phone />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(Profile)
