/**
 * Created by yi.dai on 2018/4/13.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Miment from 'miment';
import './Comment.css';

class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
          'ip': '',
          'sendMsg': '',
          'msgArr': []
        };

        this.ws = undefined;
    }

    componentDidMount() {
        this.ws = this.connectWS();

        window.addEventListener('keyup', (e) => {
          const event = e || window.event;
          const key = event.which || event.keyCode || event.charCode;
          if (key === 13) {
              this.handleClickButton();
          }
        });

        window.onbeforeunload = () => {
          this.ws.close();
        };
    }

    connectWS() {
      const that = this;
      const ws = new WebSocket('ws://106.15.93.13:65534');

      // 连接关闭后的回调函数
      ws.onclose = () => {
        ws.close();
        console.log('ws closed');
        this.connectWS();
      };

      // 连接失败后的回调函数
      ws.onerror = (event) => {
        ws.close();
        console.log('ws connected error: ', event);
        this.connectWS();
      };

      // 连接成功后的回调函数
      ws.onopen = () => {
        console.log('ws connected success');
      };

      // 从服务器接受到信息时的回调函数
      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);

        if(msg.data) {
          this.state.msgArr.push(msg);
          that.setState({ 'msgArr': this.state.msgArr }, () => {
            const chatRoom = document.getElementById('wechatShow');
            chatRoom.scrollTop = chatRoom.scrollHeight;
          });
        }

        that.setState({ 'ip': msg.ip });
      };

      return ws;
    }

    handleClickButton() {
      if(this.state.sendMsg && this.state.sendMsg.trim().length > 0) {
          this.ws.send(this.state.sendMsg.trim());
          this.setState({ 'sendMsg': '' });
      }
    }

    render() {
        return (
            <div className='wechat-container'>
                <div id='wechatShow' className='wechat-show'>
                    <p className='wechat-header'>
                      Chat Room
                      <RaisedButton
                          label='clear'
                          style={{ 'marginLeft': '20px' }}
                          onClick={() => this.setState({ 'msgArr': [] })}
                      />
                    </p>
                    <div>
                      {
                          this.state.msgArr.map(msg => (
                              <div>
                                {`${msg.ip.substr(7)}(${new Miment(msg.ts).format()}): ${msg.data}`}
                              </div>
                          ))
                      }
                    </div>
                </div>
                <div className='wechat-input'>
                    <p>
                        <span>Your ip: </span>
                        <span>{this.state.ip}</span>
                    </p>
                    <TextField
                        // defaultValue='Say something'
                        floatingLabelText='Say Something'
                        value={this.state.sendMsg}
                        style={{ 'marginRight': '20px' }}
                        onChange={(e, newValue) => this.setState({ 'sendMsg': newValue })}
                    />
                    <RaisedButton
                        label='Send'
                        primary={true}
                        onClick={() => this.handleClickButton()}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Comment);
