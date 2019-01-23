import React, { Component } from 'react';
import { connect } from 'react-redux';
import './WriteDoc.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { saveDoc, getDocById, editDoc } from 'action';
import { getQueryString } from 'common';
import { browserHistory } from 'react-router';
import miment from 'miment';
import Message from '../components/Message/index';
import Md from '../components/ReactMarkdown/index';

const template = `---
FridayDai say: <br>
下面是markdown语法的模板，官方文档基本都是基于markdown来写的，markdown语法相当简单，一劳永逸<br>
右边就是你的的东西，在这里你可以随意的编辑你的文档,把这些擦了随意写吧,记得右上角保存哦,let's go

# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules

___

---

***


## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with \`+ \`, \` - \`, or \` * \`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as \`1.\`

Start numbering with offset:

57. foo
1. bar


## Code

Inline \`code\`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

\`\`\`
Sample text here...
\`\`\`

Syntax highlighting

\`\`\` js
var foo = function (bar) {
    return bar++;
};

console.log(foo(5));
\`\`\`

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)


## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"


## Plugins

The killer feature of \`markdown - it\` is very effective support of
[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).


### [Emojies](https://github.com/markdown-it/markdown-it-emoji)

> Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:
>
> Shortcuts (emoticons): :-) :-( 8-) ;)

see [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.


### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)

- 19^th^
- H~2~O


### [\<ins>](https://github.com/markdown-it/markdown-it-ins)

++Inserted text++


### [\<mark>](https://github.com/markdown-it/markdown-it-mark)

==Marked text==


### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.


### [Definition lists](https://github.com/markdown-it/markdown-it-deflist)

Term 1

:   Definition 1
with lazy continuation.

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

_Compact style:_

Term 1
  ~ Definition 1

Term 2
  ~ Definition 2a
  ~ Definition 2b


### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)

This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

*[HTML]: Hyper Text Markup Language

### [Custom containers](https://github.com/markdown-it/markdown-it-container)

::: warning
*here be dragons*
:::`; 

class WriteDoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'source': template,
            'title': `${miment().format('YYYY-MM-DD-hh:mm')}-title.markdown`,
            'desc': 'This is your description',
            'open': false,
            'errMsg': '',
            'isEdit': getQueryString('isEdit'),
            'id': getQueryString('id'),
            'firstFlag': true
        };
    }

    componentWillMount() {
        if (this.state.id && !isNaN(parseInt(this.state.id))) {
            // dispatch
            this.props.dispatch(getDocById(this.state.id));
        }
    }

    componentDidMount() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.isEdit === 'true') {
           this.setState({
                'title': nextProps.docReducer.docFile.title,
                'desc': nextProps.docReducer.docFile.desc,
                'source': nextProps.docReducer.docFile.text
            }); 
            if (!this.state.firstFlag) {
                this.setState({ 'open': true, 'errMsg': '保存成功，快回主页看看吧！' });
                setTimeout(() => {
                    this.setState({ 'open': false, 'errMsg': '' });
                    browserHistory.push('/homepage');
                }, 2000);
            } else {
                this.state.firstFlag = false;
            }
        } else {
            this.setState({ 'open': true, 'errMsg': '保存成功，快回主页看看吧！' });
            setTimeout(() => {
                this.setState({ 'open': false, 'errMsg': '' });
                browserHistory.push('/homepage');
            }, 2000);
        }
    }

    saveDoc() {
        if(!this.state.title) {
            this.setState({ 'open': true, 'errMsg': 'please Input title' });
            setTimeout(() => {
                this.setState({ 'open': false, 'errMsg': '' });
            }, 2000);
            return;
        }
        if(!this.state.desc) {
            this.setState({ 'open': true, 'errMsg': 'please Input description' });
            setTimeout(() => {
                this.setState({ 'open': false, 'errMsg': '' });
            }, 2000);
            return;
        }
        if(!this.state.source) {
            this.setState({ 'open': true, 'errMsg': 'please Input source' });
            setTimeout(() => {
                this.setState({ 'open': false, 'errMsg': '' });
            }, 2000);
            return;
        }

        // dispatch action saveDoc
        if(this.state.isEdit === 'true') {
            this.props.dispatch(editDoc(this.state.id, this.state.title, this.state.desc, this.state.source));
        } else {
            this.props.dispatch(saveDoc(this.state.title, this.state.desc, this.state.source));
        }
    }

    render() {
        return (
            <div className='write-doc-content'>
                <div className='write-doc-header'>
                    <span className='span-header'>Title:</span>   
                    <TextField
                        value={this.state.title}
                        onChange={e => this.setState({ 'title': e.target.value })}
                        hintText='Input Title'
                    />
                    <span className='span-header'>Description:</span> 
                    <TextField
                        value={this.state.desc}
                        onChange={e => this.setState({ 'desc': e.target.value })}
                        hintText='Input Description'
                    />
                    <RaisedButton 
                        label='Save'
                        primary={true} 
                        style={{ 'float': 'right' }}
                        onClick={() => this.saveDoc()}
                    />
                </div>
                <div className='text-content'>
                    <div className='text-field'>
                        <textarea
                            value={this.state.source}
                            className='text-area'
                            onInput={e => this.setState({ 'source': e.target.value })}
                        />
                    </div>
                    <div className='text-parse'>
                        <Md source={this.state.source} />
                    </div>
                </div>
                <Message
                    open={this.state.open}
                    textMessage={this.state.errMsg}
                />
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(WriteDoc);
