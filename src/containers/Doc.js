/**
 * Created by yi.dai on 2018/3/30.
 */
/**
 * Created by yi.dai on 2017/12/18.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.css';
import '../common/style.css';
import hljs from 'highlightjs';
import '../common/highlight-default.css';
import Md from '../components/ReactMarkdown/index';
import {getDocById} from '../actions/index';

class Doc extends Component {
    constructor(props) {
        super(props);

        this.id = window.location.pathname.substr(1);
    }

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(getDocById(this.id));
    }

    componentDidMount() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        document.querySelectorAll('pre code').forEach((item) => {
            hljs.highlightBlock(item);
        });

        hljs.initHighlightingOnLoad();
    }

    render() {
        const {docReducer} = this.props;
        const docFile = docReducer.docFile || '';

        return (
            <div className='homepage-content'>
                <section className='section-part'>
                    <h1>{this.id}</h1>
                    <Md source={docFile} />
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(Doc)
