/**
 * Created by yi.dai on 2018/6/19.
 */
import React, {Component} from 'react';

export default class Dot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'choosed': 0
        };
    }

    handleDotClick(i) {
        this.setState({'choosed': i});
        this.props.callback(i);
    }

    render() {
        const dotNodes = [];
        for(let i = 0; i < this.props.count; i++) {
            dotNodes[i] = (
                <span
                    key={'dot' + i}
                    className={this.state.choosed === i ? ` imgSlider-dot imgSlider-dot-choosed` : 'imgSlider-dot'}
                    onClick={() => this.handleDotClick(i)}
                >
                </span>
            );
        }

        return(
            <div className="imgSlider-dot-wrapper">
                {dotNodes}
            </div>
        );
    }
}

Dot.defaultProps = {
    'count': 0,
    'choosed': -1
};