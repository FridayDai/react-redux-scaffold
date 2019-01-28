/**
 * Created by yi.dai on 2018/3/30.
 */
/**
 * Created by yi.dai on 2017/12/18.
 */
import React, { Component } from 'react';
import { dispatch } from 'dispatch';
import { connect } from 'react-redux';
import './HomePage.css';
import '../common/style.css';
import hljs from 'highlightjs';
import '../common/highlight-default.css';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import Md from '../components/ReactMarkdown/index';
import { getDocById, deleteDoc } from '../actions/index';
import Message from '../components/Message/index';

class Doc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'open': false,
            'errMsg': ''
        };

        this.id = window.location.pathname.substr(1);
    }

    // static getDerivedStateFromProps(next, pre) {
    //     console.log(next, pre);
    //     console.log('getDerivedStateFromProps');
    // }

    componentDidMount() {
        dispatch(getDocById(this.id));

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        document.querySelectorAll('pre code').forEach((item) => {
            hljs.highlightBlock(item);
        });

        hljs.initHighlightingOnLoad();
    }

    render() {
        const { docReducer } = this.props;
        let docFile = '';
        let docTitle = '';
        let docDesc = '';
        let docId = 0;
        if (docReducer.docFile && docReducer.docFile.code === 10000) {
            docFile = docReducer.docFile.text;
            docDesc = docReducer.docFile.desc;
            docTitle = docReducer.docFile.title;
            docId = docReducer.docFile.id;
        } else if (docReducer.docFile && docReducer.docFile.code === -10005) {
            docFile = '不要随便乱写URL';
            docDesc = '我的网站里有隐藏小片片';
            docTitle = '被你发现就不好了。。。';
        }

        return (
            <div className='homepage-content'>
                <div style={{ 'float': 'right', 'display': `${docId === 0 ? 'none' : ''}` }}>
                    <RaisedButton 
                        style={{ 'marginRight': '10px' }}
                        label='编辑' 
                        secondary={true}
                        onClick={() => {
                            browserHistory.push(`/writeDoc?isEdit=true&id=${docId}`);
                        }}
                    />
                    <RaisedButton 
                        label='删除' 
                        secondary={true}
                        onClick={() => {
                            dispatch(deleteDoc(this.id));
                        }}
                    />
                </div>
                <section className='section-part'>
                    <h1>{docTitle}</h1>
                    <h3>{docDesc}</h3>
                    <Md source={docFile} />
                </section>
               <Message 
                    open={this.state.open}
                    textMessage={this.state.errMsg}
               />
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Doc);
