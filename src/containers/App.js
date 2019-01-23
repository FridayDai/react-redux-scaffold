import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import './App.css';

// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider>
                <div className='app-content'>{this.props.children}</div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(App);
