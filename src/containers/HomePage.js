/**
 * Created by yi.dai on 2017/12/18.
 */
import React, { Component } from 'react';
import { dispatch } from 'dispatch';
// import {fetchTopics, testAction} from '../actions/index';
import { connect } from 'react-redux';
import Miment from 'miment';
import './HomePage.css';
import { browserHistory } from 'react-router';
import '../common/style.css';
import hljs from 'highlightjs';
import Pages from '../components/HomePage/Pages';
import '../common/highlight-default.css';
import { getDocList } from '../actions/index';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // const { dispatch } = this.props;
    dispatch(getDocList());

    document.querySelectorAll('pre code').forEach((item) => {
      hljs.highlightBlock(item);
    });

    hljs.initHighlightingOnLoad();
    console.log(Miment().format());
  }

  render() {
    const { docReducer } = this.props;
    const docList = docReducer.docList || {};
    const test = `const Koa = require('koa');
const app = new Koa(); 
app.use(async ctx => { 
    ctx.body = 'Hello World'; 
});  
app.listen(3000);`;

    return (
      <div className='homepage-content'>
        <Pages
          props={this.props}
          docList={docList}
        />
        <section className='section-part'>
          <h1 id='introduction'>Introduction</h1>
          <div className='color-grey'>
            Koa is a new web framework designed by the team behind Express, which aims to be a smaller,
            more expressive, and more robust foundation for web applications and APIs.
            Through leveraging generators Koa allows you to ditch callbacks and greatly increase error-handling.
            Koa does not bundle any middleware within core, and provides an elegant suite of methods
            that make writing servers fast and enjoyable.
          </div>
        </section>
        {/* <section className='section-part'> */}
        {/* <h1 id='introduction'>轮播图</h1> */}
        {/* <ImgSlider */}
        {/* imgs={imgs} */}
        {/* // speed={2} */}
        {/* // autoplay={true} */}
        {/* dots={true} */}
        {/* arrows={true} */}
        {/* /> */}
        {/* </section> */}
        <section className='section-part'>
          <h1 id='installation'>Installation</h1>
          <div className='color-grey'>
                        Koa requires node v7.6.0 or higher for ES2015 and async function support.
          </div>
          <div className='color-grey'>
                        You can quickly install a supported version of node with your favorite version manager:
          </div>
          <pre>
            <code className='hljs'>
                            $ nvm install 7
              {' '}
              <br />
                            $ npm i koa
              {' '}
              <br />
                            $ node my-koa-app.js
            </code>
          </pre>
        </section>
        <section className='section-part'>
          <h1 id='application'>Application</h1>
          <div className='color-grey'>
              A Koa application is an object containing an array of middleware functions which are composed
              and executed in a stack-like manner upon request. Koa is similar to many other middleware systems
              that you may have encountered such as Ruby&apos;s Rack, Connect, and so on - however a key design decision
              was made to provide high level &quot;sugar&quot; at the otherwise low-level middleware layer. This improves
              interoperability, robustness, and makes writing middleware much more enjoyable.

              This includes methods for common tasks like content-negotiation, cache freshness, proxy support,
              and redirection among others. Despite supplying a reasonably large number of helpful methods
              Koa maintains a small footprint, as no middleware are bundled.

              The obligatory hello world application:
          </div>
          <pre>
            <code className='hljs'>
              {test}
            </code>
          </pre>
        </section>
        {
          Object.keys(docList).reverse().map(doc => (
            <section className='section-part'>
              <h1
                style={{ 'cursor': 'pointer' }}
                className='hover-underline-animation'
                id={doc}
                onClick={() => {
                  browserHistory.push(`/${doc}`);
                }}
              >
                {docList[doc].name || ''}
              </h1>
              <h5>
                <span className='label-html'>HTML</span>
                <span className='label-css'>CSS</span>
                <span className='label-js'>JAVASCRIPT</span>
                <span className='label-linux'>Linux</span>
              </h5>
              <div className='color-grey'>{docList[doc].desc || ''}</div>
            </section>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(HomePage);
