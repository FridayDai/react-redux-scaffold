/**
 * Created by yi.dai on 2018/6/19.
 */
import React, { Component } from 'react';

export default class Arrow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //
    };
  }

  render() {
    return (
      <div className='imgSlider-arrow-wrapper'>
        <span className='arrow-left' />
        <span className='arrow-right' />
      </div>
    );
  }
}
