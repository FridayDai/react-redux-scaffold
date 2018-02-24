/**
 * Created by yi.dai on 2018/2/23.
 */
import React, {Component} from 'react';
import './Pages.css';

export default class Pages extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.body.addEventListener('mousewheel', (e) => {
            const delta = e.wheelDelta ? e.wheelDelta / 150 : 0;
            if(delta === 1) {
                console.log('向上滚');
            } else if(delta === -1) {
                console.log('向下滚');
            }
        });
    }

    render() {
        return (
            <div className='pages'>
                <div className='page1 current'>page1</div>
                <div className='page2'>page2</div>
                <div className='page3'>page3</div>
            </div>
        );
    }
}
