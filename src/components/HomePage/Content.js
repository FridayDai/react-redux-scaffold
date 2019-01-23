/**
 * Created by yi.dai on 2018/2/15.
 */
import React, { Component } from 'react';
import ActionHome from 'material-ui/svg-icons/action/home';
// import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import { browserHistory } from 'react-router';
import './Content.css';

export default class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // 'open': false
    };
  }

  render() {
    const { docList } = this.props;

    return (
      <section className='content'>
        <div className='nav-home'>
          <IconMenu
            menuItemStyle={{ 'textAlign': 'center' }}
            menuStyle={{ 'maxHeight': '250px' }}
            iconButtonElement={<IconButton><ActionHome /></IconButton>}
            anchorOrigin={{ 'horizontal': 'right', 'vertical': 'bottom' }}
            targetOrigin={{ 'horizontal': 'right', 'vertical': 'top' }}
          >
            <MenuItem primaryText={<a className='anchor' href='#introduction' onClick={() => false}>Introduction</a>} />
            <MenuItem primaryText={<a className='anchor' href='#installation' onClick={() => false}>Installation</a>} />
            <MenuItem primaryText={<a className='anchor' href='#application' onClick={() => false}>Application</a>} />
            {
              Object.keys(docList).map(item => (
                <MenuItem primaryText={<a className='anchor' href={`#${item}`} onClick={() => false}>{docList[item].name || ''}</a>} />
              ))
            }
          </IconMenu>
        </div>
        <div
          className='back-to-top'
          onClick={() => { document.body.scrollTop = 0; document.documentElement.scrollTop = 0; }}
        >
          top
        </div>

        <div className='heading'>
          <div id='logo' className='logo'>doc</div>
          <span
            className='write-doc'
            onClick={() => browserHistory.push('/writeDoc')}
          >
            Click Here to Write Doc
          </span>
        </div>
      </section>
    );
  }
}
