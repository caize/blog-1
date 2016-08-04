import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import TimeAgo from 'react-timeago';

const styles = {
	article: {
			margin: '0 auto',
			paddingLeft: 15,
			paddingBottom: 5
	},
	body: {
		marginTop: 10,
		lineHeight: 2,
		color: "rgba(0,0,0,0.8)"
	},
		button: {
			float: 'right',
		}
}

class Article extends Component {
  constructor(props) {
    super(props)
  }

	initArticleBody(val) {
		let initBody = val.replace(/<[^>]+>/g, "");
		if(initBody.length > 100) {
			initBody = initBody.substring(0,100);
			return initBody + " ...... ";
		}
		return initBody;
	}

  render() {
    let { article } = this.props;
    return(
      <div style={styles.article} className="article">
        <h3><Link to={`/articles/${article.id}`}>{article.title}</Link></h3>
        <small>
          <Link to={`/about`}>{article.author_username}</Link> ·
          <Link to={`/nodes/${article.node_id}`}>{article.node_title}</Link> ·
          <TimeAgo date={article.created_at} /></small>
        <div dangerouslySetInnerHTML={{__html: this.initArticleBody(article.body)}} style={styles.body} />
      </div>
    )
  }
}

export default connect()(Article);
