/**
 * Created by yi.dai on 2018/4/3.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../common/style.css';

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                style={{'fontSize': '2em', 'fontWeight': '600'}}
                className='center-center'
            >
                To Be Continue...
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(Profile)
