/**
 * Created by yi.dai on 2018/2/23.
 */
import React, { PureComponent } from 'react';
import './Pages.css';
import NavHeader from './NavHeader';
// import NavHeaderLiHui from './NavHeaderLiHui';
// import NavHeaderShiZong from './NavHeaderShiZong';
import Content from './Content';

export default class Pages extends PureComponent {
  render() {
    return (
      <div id='pages' className='pages'>
        <NavHeader
          props={this.props}
          dispatch={this.props.dispatch}
        />
        <Content docList={this.props.docList} />
      </div>
    );
  }
}
