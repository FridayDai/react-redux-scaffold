/**
 * Created by yi.dai on 2018/6/19.
 */
import React, { Component } from 'react';
import Item from './Item/Item';
import Dot from './Dot/Dot';
import Arrow from './Arrow/Arrow';
import './index.css';

export default class ImgSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      move: 0, // 像左边移动的个数
    };
  }

  doMove(move) {
    this.setState({ move });
  }

  render() {
    const count = this.props.imgs.length;
    return (
      <div className="imgSlider">
        {
          this.props.imgs.map((img, index) => (
            <Item
              key={img.src}
              src={img.src}
              alt={img.alt}
              count={count}
              left={`${(index - this.state.move) * 100}%`}
            />
          ))
        }
        {
          this.props.dots && (
            <Dot
              count={count}
              // choosed={this.state.choosed}
              callback={move => this.doMove(move)}
            />
          )
        }
        {
          this.props.arrows && (
            <Arrow />
          )
        }
      </div>
    );
  }
}

ImgSlider.defaultProps = {
  imgs: [],
  dots: false,
  arrows: false,
};
