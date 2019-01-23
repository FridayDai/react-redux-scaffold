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
        this.state = {};
    }

    render() {
        return (
            <div
                style={{ 'height': '100%', 'backgroundColor': '#e9fbf8' }}
                // className='center-center'
            >
                <Phone />
                <div style={{ 'display': 'none' }}>
                    <textarea
                        rows='10'
                        cols='30'
                    />

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Profile);
