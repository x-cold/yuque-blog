import React, {Component} from 'react';
import {connect} from 'react-redux';

import {requestPost} from '../actions/post.js';

class PostContainer extends Component {

  render() {
    const post = this.getPost();
    return React.cloneElement(this.props.children, {
      post: post,
      ui: this.props.ui,
    });
  }

  componentDidMount() {
    const {slug, dispatch} = this.props;
    dispatch(requestPost(slug));
  }

  getPost() {
    const {slug, postsBySlug} = this.props;
    const post = postsBySlug[slug];
    return (post && post.status === 'success') ? post.data : null;
  }
}

function mapStateToProps(state) {
  return {
    ui: state.ui,
    postsBySlug: state.posts.bySlug
  };
}

export default connect(mapStateToProps)(PostContainer);
