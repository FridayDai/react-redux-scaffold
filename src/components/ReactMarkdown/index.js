import './dpl.css';
import React from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlightjs';
import markdownIt from 'markdown-it';
import './xcode.css';

const md = markdownIt({
  html: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class='hljs language-${lang}'><code>${hljs.highlight(lang, str, true).value}</code></pre>`;
      } catch (e) {
        console.log(e);
      }
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
});

export default class ReactMarkdown extends React.Component {
  constructor(props) {
    super(props);
    this._lastContent = '';
  }

  componentDidMount() {
    this._fillMdContent(this.props);
  }

  componentWillReceiveProps(np) {
    this._fillMdContent(np);
  }

  _fillMdContent(props = this.props) {
    if (props.source !== this._lastContent) {
      this._lastContent = props.source;
      const source = this._fixStrongBug(props.source);
      // const source2Zmag = this._relpaceImage(source);
      let html = md.render(this._replaceMdContent(source));
      html = this._enableHtml(html);
      html = this._replaceLinkTarget(html);
      html = this._enableAnchor(html);
      this.refs.mdContainer.innerHTML = html;
      this._initAnchorEvent();
    }
  }

  // _relpaceImage(source){
  //     const reg = /!\[.*\]\((http:\/\/106.15.93.13\/img\/.*\.png)\)/g;
  //
  //
  //     return source.replace(reg, (src, $1) => {
  //         return '<Zmage src={$1} />';
  //     });
  // }

  // 替换掉md中的不能解析的内容，比如图片的路径
  _replaceMdContent(source) {
    return this._replaceImgPath(source);
  }

  // 图片路径的替换，有两个输入，一个是path，是当前文件的路径
  // 一个是图片在当前目录中的相对路径
  // 1、把\替换为/
  // 2、把图片路径中的每个../，删掉path中一个文件夹
  // 3、把图片路径中的./删除
  // 这个图片路径的中间（非起始位置）不能有../等相对路径，否则不会被解析
  _replaceImgPath(source = '') {
    let { path = '' } = this.props;
    path = `${path}`;
    return source.replace(/(!\[[^\]]*\]\()([^\)]*)(\))/gi, (src, $1, $2, $3) => {
      const filePath = path.split('/');
      const upTimes = $2.match(/\.\.\//g);
      if (upTimes) {
        upTimes.forEach(() => filePath.pop());
      }
      filePath.splice(filePath.length - 1, 1, '');
      let imgPath = `${filePath.join('/')}${$2.replace(/\\/g, '/').replace(/\.\.\//g, '').replace('./', '')}`;
      imgPath = encodeURI(imgPath);
      return `${$1}${imgPath}${$3}`;
    });
  }

  // 把html标签解析出来
  _enableHtml(html = '') {
    if (!this.props.enableHtml) {
      return html;
    }
    return html.replace(/!(&lt;.*\/(&gt;|[^\s]*&gt;))/gi, (src, $1) => this._decodeHtml($1));
  }

  _decodeHtml(text = '') {
    // 1.首先动态创建一个容器标签元素，如DIV
    let temp = document.createElement('div');
    // 2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
    temp.innerHTML = text;
    // 3.最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
    const output = temp.innerText || temp.textContent;
    temp = null;
    return output;
  }

  // a标签默认改成当前页面跳转
  _replaceLinkTarget(html = '') {
    return html.replace(/<a([^>]*)>/gi, (src, $1) => {
      if (/target=['"]/i.test(src)) {
        return src;
      }
      return `<a${$1} target="_top">`;
    });
  }

  // 把每行末尾的#xxxxx解析成锚点
  _enableAnchor(html = '') {
    return this.props.enableAnchor
      ? html.replace(/(<\w*)(>.*)!\(#([_\w]*)\)(<\/\w*>)/gi, '$1 id="$3"$2$4')
      : html;
  }

  _initAnchorEvent() {
    if (this.props.enableAnchor) {
      this.refs.mdContainer.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', (e) => {
          const href = e.target.getAttribute('href');
          if (href && /^#[a-zA-Z]\S*$/.test(href)) {
            const dom = this.refs.mdContainer.querySelector(href);
            if (dom) {
              dom.scrollIntoView();
            }
            e.preventDefault();
          }
        });
      });
    }
  }

  // **xxxxx** 加强效果的bug，如果是 yyy**xxxx**zzzz 这种情况，y不是分隔符，x以分隔符开始，则出错了
  // 非标
  _fixStrongBug(source = '') {
    function isSeparator(c) {
      const char = c.charCodeAt(0);
      return md.utils.isMdAsciiPunct(char) || md.utils.isPunctChar(String.fromCharCode(char));
    }

    return source.replace(/\*\*[^\*]*\*\*/g, (str, index) => {
      let lastChar = source[index - 1];
      let nextChar = source[index + 2];
      let lastAdd = '';
      let nextAdd = '';
      if (lastChar && /\S/.test(lastChar) && !isSeparator(lastChar) && nextChar && isSeparator(nextChar)) {
        lastAdd = ' ';
      }

      lastChar = source[index + str.length - 3];
      nextChar = source[index + str.length];
      if (nextChar && /\S/.test(nextChar) && !isSeparator(nextChar) && lastChar && isSeparator(lastChar)) {
        nextAdd = ' ';
      }
      return `${lastAdd}${str}${nextAdd}`;
    });
  }

  render() {
    return (
      <React.Fragment>
        <div ref="mdContainer" className="markdown-body" />
      </React.Fragment>
    );
  }
}

ReactMarkdown.propTypes = {
  source: PropTypes.string,
  path: PropTypes.string,
  enableHtml: PropTypes.bool,
  enableAnchor: PropTypes.bool,
};
