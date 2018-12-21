/**
 * Created by yi.dai on 2018/12/21.
 */
import React, {Component} from 'react';

export default class Loading extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{'background': 'red'}}>
                My Loading
            </div>
        );
    }
}
