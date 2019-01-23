/**
 * Created by yi.dai on 2018/4/13.
 */
import React, { Component } from 'react';
import './index.css';

export default class SingleComment extends Component {
  static format(x) {
    if (x < 10) {
      return `0${x}`;
    }
    return x;
  }

  constructor(props) {
    super(props);

    this.state = {
      //
    };
  }

  showTime(timedate) {
    const timestamp = new Date(timedate).getTime();
    if (timestamp > 0) {
      const date = new Date(timestamp);
      const y = date.getFullYear();
      const m = `${this.format(date.getMonth() + 1)}`;
      const d = `${this.format(date.getDate())}`;
      const hour = `${this.format(date.getHours())}`;
      const min = `${this.format(date.getMinutes())}`;
      const sec = `${this.format(date.getSeconds())}`;

      return `${y}-${m}-${d} ${hour}:${min}:${sec}`;
    }
    return '--';
  }

  render() {
    return (
      <div className='single-comment'>
        <h5>
            标题：
          {this.props.title}
        </h5>
        <p>
            描述：
          {this.props.comment}
        </p>
        <p>
            创建时间:
          {this.showTime(this.props.createTime)}
        </p>
        <p>
            更新时间:
          {this.showTime(this.props.updateTime)}
        </p>
      </div>
    );
  }
}
