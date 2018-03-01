/**
 * Created by yi.dai on 2018/2/23.
 */
import React, {Component} from 'react';
import './Pages.css';
import NavHeader from './NavHeader';
import NavHeaderLiHui from './NavHeaderLiHui';
import NavHeaderShiZong from './NavHeaderShiZong';
import Content from './Content';


export default class Pages extends Component {
    constructor(props) {
        super(props);

        this.currentPage = 1;
    }

    componentDidMount() {
        let lock = true;
        document.body.addEventListener('mousewheel', (e) => {
            let currentPage = this.currentPage;
            
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
                this.currentPage = currentPage;
                console.log(this.currentPage);
                if(this.props.currentPage) {
                    this.props.currentPage(currentPage);
                }

                // 这里做page的翻页效果
                document.getElementById('pages').style.transform = `translate(0px, -${(currentPage - 1) * 100}%)`;

                lock = false;
                setTimeout(() => {
                    lock = true;
                }, 1100);
            }
        });
    }

    moveToNextPage () {
        this.currentPage += 1;
        
        if(this.currentPage < 1) {
            this.currentPage = 1;
        }
        if(this.currentPage > 3) {
            this.currentPage = 3;
        }
        console.log(this.currentPage);
        if(this.props.currentPage) {
            this.props.currentPage(this.currentPage);
        }
        document.getElementById('pages').style.transform = `translate(0px, -${(this.currentPage - 1) * 100}%)`;
    }
    
    render() {
        return (
            <div id='pages' className='pages'>
                <div className='page1'>
                    <NavHeader
                        props={this.props}
                        dispatch={this.props.dispatch}
                    />
                    <Content />
                    <div 
                        className='box'
                        onClick={() => this.moveToNextPage()}
                    >
                        <span className='arrow-bottom'></span>
                    </div>
                </div>
                <div className='page2'>
                    <NavHeaderLiHui />
                    <div 
                        className='box2'
                        onClick={() => this.moveToNextPage()}
                    >
                        <span className='arrow-bottom'></span>
                    </div>
                </div>
                <div className='page3'>
                    <NavHeaderShiZong />
                </div>
            </div>
        );
    }
}
