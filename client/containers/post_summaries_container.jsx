import React, { Component } from '../../../../Library/Caches/typescript/2.9/node_modules/@types/react';
import { connect } from '../../../../Library/Caches/typescript/2.9/node_modules/@types/react-redux';

import {
  requestPostSummaries,
  requestPost
} from '../actions/post.js';

class PostSummariesContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const posts = this.getFilteredPosts();
    const post = this.getPost();
    return React.cloneElement(this.props.children, {
      posts: posts,
      post: post,
      dispatch: this.props.dispatch,
      ui: this.props.ui,
      url: this.props.url,
    });
  }

  componentDidMount() {
    this.props.dispatch(requestPostSummaries());
    if (this.props.slug) {
      this.props.dispatch(requestPost(this.props.slug));
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.slug && (this.props.slug !== nextProps.slug)) {
      this.props.dispatch(requestPost(nextProps.slug));
    }
  }

  getPost() {
    const post = this.props.posts.bySlug[this.props.slug];
    if (post) {
      return post.data;
    }
  }

  getPosts() {
    const { summaries } = this.props.posts;
    if (!summaries) {
      return [];
    }
    return summaries.data || [];
  }

  getFilteredPosts() {
    const posts = this.getPosts();
    const { activeTagName } = this.props;
    if (!activeTagName) {
      return posts;
    }
    return posts.filter((post) => {
      const tagNames = post.tags.map(tag => tag.name);
      return tagNames.indexOf(activeTagName) > -1;
    });
  }
}

function mapStateToProps(state) {
  return {
    ui: state.ui,
    posts: state.posts
  };
}

export default connect(mapStateToProps)(PostSummariesContainer);
