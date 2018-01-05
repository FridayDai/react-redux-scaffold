import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
};

export default connect(mapStateToProps)(App)