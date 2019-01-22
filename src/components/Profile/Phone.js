/**
 * Created by yi.dai on 2018/4/4.
 */
import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import { List, ListItem } from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import './Phone.css';

const question = {
  0: ['你好呀', '很高兴认识你', '去你大爷'],
  1: ['你想找份什么工作呢？', '你今年多大啦？', '你有没有女朋友啊？'],
  2: ['你做前端都会些什么呢？', '会说相声吗？', '会扯淡吗'],
};

const conversation = {
  0: ['你想问点什么？', '不要学我说话', '去你二大爷'],
  1: ['我目前从事前端开发，以后也会找这相关的工作', '今年20，明年18', '滚滚滚！'],
  2: ['我会可多了，以后再告诉你', '竹板这么一打啊，是别的咱不夸，咱夸一夸，咱这狗不理包砸。', '会！'],
};

export default class Phone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      open: false,
      allList: [], // 所有的会话
      isFridayDaiTalking: false,
    };
  }

  componentDidUpdate() {
    // 滚动到底部
    const div = document.getElementById('phoneBody');
    div.scrollTop = div.scrollHeight;
  }

  setAnswer(anwserCount, data) {
    this.setState({
      allList: this.state.allList.concat(data),
      isFridayDaiTalking: true,
    });
    setTimeout(() => {
      this.setState({ isFridayDaiTalking: false }, () => {
        const fridayDaiTalk = conversation[this.state.count][anwserCount];
        this.setState({ allList: this.state.allList.concat(fridayDaiTalk) });
        if (this.state.count + 1 < Object.keys(question).length) {
          if (anwserCount === 0) {
            this.setState({ count: this.state.count + 1 }); // 记录第几题
          }
        }
      });
    }, 3500);
  }

  closeDialog() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div className="phone-content center-center">
        <div className="phone-header">
          <span className="center-center">I'm FridayDai</span>
        </div>
        <div id="phoneBody" className="phone-body">
          <div className="text-align">
            <div className="msg msg-direction">
              <span>很高兴认识你</span>
            </div>
          </div>
          {
                        this.state.allList.map(item => (
                          <div className="text-align">
                            <div className="msg msg-direction">
                              <span>{item}</span>
                            </div>
                          </div>
                        ))
                    }
          {
                        this.state.isFridayDaiTalking && (
                        <div className="text-align">
                          <div style={{ textAlign: 'center' }} className="msg msg-direction">
                            <CircularProgress
                              size={20}
                              style={{ width: '60px', height: '20px' }}
                              innerStyle={{ width: '20px', height: '20px' }}
                            />
                          </div>
                        </div>
                        )
                    }

          <Dialog
            contentStyle={{ maxWidth: '320px' }}
            title="你想说点什么..."
            modal={false}
            open={this.state.open}
            onRequestClose={() => this.setState({ open: false })}
          >
            <List>
              <ListItem
                primaryText={question[this.state.count][0]}
                onClick={(e) => {
                  this.setAnswer(0, e.target.innerText);
                  this.closeDialog();
                }}
              />
              <ListItem
                primaryText={question[this.state.count][1]}
                onClick={(e) => {
                  this.setAnswer(1, e.target.innerText);
                  this.closeDialog();
                }}
              />
              <ListItem
                primaryText={question[this.state.count][2]}
                onClick={(e) => {
                  this.setAnswer(2, e.target.innerText);
                  this.closeDialog();
                }}
              />
            </List>
          </Dialog>
        </div>
        {
                    !this.state.isFridayDaiTalking && (
                    <div className="phone-foot" onClick={() => this.setState({ open: true })}>
                      <span className="center-center">你想说点什么...</span>
                    </div>
                    )
                }
        {
                    this.state.isFridayDaiTalking && (
                    <div className="phone-foot">
                      <span className="center-center">FridayDai正在输入...</span>
                    </div>
                    )
                }
      </div>
    );
  }
}
