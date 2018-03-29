/**
 * Created by yi.dai on 2018/2/15.
 */
import React, {Component} from 'react';
import ActionHome from 'material-ui/svg-icons/action/home';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import './Content.css';

export default class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // 'open': false
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', () => {
// 
        });
    }

    render() {
        return (
            <section className='content'>
                <div className='nav-home'>
                    <IconMenu
                        menuItemStyle={{'textAlign': 'center'}}
                        iconButtonElement={<IconButton><ActionHome /></IconButton>}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                    >
                        <MenuItem primaryText={<a className='anchor' href='#introduction' onClick={() => false}>Introduction</a>} />
                        <MenuItem primaryText={<a className='anchor' href='#installation' onClick={() => false}>Installation</a>} />
                        <MenuItem primaryText={<a className='anchor' href='#application' onClick={() => false}>Application</a>} />
                        <MenuItem primaryText={<a className='anchor' href='#hello_world' onClick={() => false}>Hello World</a>} />
                    </IconMenu>
                </div>
                
                <div className='heading'>
                    <div id='logo' className='logo'>koa</div>
                    <div className='desc'>next generation web framework for node.js</div>
                </div>
            </section>
        );
    }
}