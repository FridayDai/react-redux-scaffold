/**
 * Created by yi.dai on 2018/4/13.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SingleComment from 'components/Comment/index';
import { getComments } from 'action';

class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'comments': []
        };
    }

    componentWillMount() {
        const { dispatch } = this.props;

        dispatch(getComments());
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            'comments': nextProps.commentReducer.data
        });
    }

    render() {
        return (
            <div
                style={{
'display': 'flex',
                    'flexFlow': 'row wrap',
'justifyContent': 'flex-start',
'alignItems': 'flex-start'
}}
            >
                {
                    this.state.comments.map(item => (
                        <SingleComment
                            key={item.id}
                            title={item.title}
                            comment={item.comment}
                            userId={item.userId}
                            createTime={item.createTime}
                            updateTime={item.updateTime}
                        />
                    ))
                }
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Comment);
