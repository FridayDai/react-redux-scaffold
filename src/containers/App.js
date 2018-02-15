import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider>
                <div className="app-content">{this.props.children}</div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return state
};

export default connect(mapStateToProps)(App)