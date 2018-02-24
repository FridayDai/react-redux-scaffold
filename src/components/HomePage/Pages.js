/**
 * Created by yi.dai on 2018/2/23.
 */
import React, {Component} from 'react';
import './Pages.css';
import NavHeader from './NavHeader';
import Content from './Content';


export default class Pages extends Component {
    constructor(props) {
        super(props);

        this.currentPage = 1;
    }

    componentDidMount() {
        let currentPage = 1;
        let lock = true;

        document.body.addEventListener('mousewheel', (e) => {
            let delta = e.wheelDelta;
            if(delta > 0) {
                delta = -1;
                // console.log('向上滚');
            } else if(delta < 0) {
                delta = 1;
                // console.log('向下滚');
            }
            // 这里设个lock是为了限流
            if(lock) {
                currentPage = currentPage - delta;

                if(currentPage < 1) {
                    currentPage = 1;
                }
                if(currentPage > 3) {
                    currentPage = 3;
                }
                
                if(this.props.currentPage) {
                    this.props.currentPage(currentPage);
                }

                // 这里做page的翻页效果
                document.getElementById('pages').style.transform = `translate(0px, -${(currentPage - 1) * 100}%)`;

                lock = false;
                setTimeout(() => {
                    lock = true;
                }, 1200);
            }
        });
    }

    render() {
        return (
            <div id='pages' className='pages'>
                <div className='page1'>
                    <NavHeader />
                    <Content />
                    <div className='box'>
                        <span className='arrow-bottom'></span>
                    </div>
                </div>
                <div className='page2'>
                    <div className='box2'>
                        <span className='arrow-bottom'></span>
                    </div>
                </div>
                <div className='page3'>
                    <h1>敬请期待</h1>
                </div>
            </div>
        );
    }
}
