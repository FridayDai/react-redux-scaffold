/**
 * Created by yi.dai on 2018/3/1.
 */
import React, { Component } from 'react';
import './index.css';

export default class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: this.props.open || false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.open,
    }, () => {
      const autoHideDuration = nextProps.autoHideDuration || 2000;
      if (this.state.open) {
        document.getElementById('messageComponent').className += ' open';
        setTimeout(() => {
          document.getElementById('messageComponent').className = 'bodyStyle';
          this.setState({ open: false });
        }, autoHideDuration);
      } else {
        this.setState({ open: false });
        document.getElementById('messageComponent').className = 'bodyStyle';
      }
    });
  }

  render() {
    return (
      <div id="messageComponent" className="bodyStyle">
        <div className="contentStyle">
          {this.props.textMessage || ''}
        </div>
      </div>
    );
  }
}
