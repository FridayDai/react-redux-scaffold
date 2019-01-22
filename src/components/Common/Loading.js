/**
 * Created by yi.dai on 2018/12/21.
 */
import React, { Component } from 'react';

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //
    };
  }

  render() {
    return (
      <div style={{
        fontSize: '16px', background: 'red', width: '200px', height: '200px',
      }}
      >
        {'hello'}
      </div>
    );
  }
}
