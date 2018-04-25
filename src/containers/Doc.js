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
        this.state = {
            'comment': ''
        };

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
        let docFile = '';
        if(docReducer.docFile && docReducer.docFile.text) {
            docFile = docReducer.docFile.text;
        }

        return (
            <div className='homepage-content'>
                <section className='section-part'>
                    <h1>{this.id}</h1>
                    <Md source={docFile} />
                </section>
                {/*<section className='section-part'>*/}
                    {/*<div>*/}
                        {/*<h5>Your Comment:</h5>*/}
                        {/*<TextField*/}
                            {/*hintText="say something..."*/}
                            {/*onInput={(e) => this.setState({'comment': e.target.value})}*/}
                        {/*/>*/}
                        {/*<br/>*/}
                        {/*<RaisedButton*/}
                            {/*label="Submit" primary={true}*/}
                            {/*onClick={() => this.props.dispatch(addComment(this.state.comment))}*/}
                        {/*/>*/}
                    {/*</div>*/}
                {/*</section>*/}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(Doc)
