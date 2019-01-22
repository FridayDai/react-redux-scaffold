/**
 * Created by yi.dai on 2018/12/21.
 */
import React, { PureComponent } from 'react';

export default class Loading extends PureComponent {
  render() {
    return (
      <div style={{ background: 'red' }}>
        {this.props.Loading}
      </div>
    );
  }
}
