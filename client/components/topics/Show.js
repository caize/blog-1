import React, {
	Component
} from 'react';

import {
	connect
} from 'react-redux';

import {
	Link
} from 'react-router';

import TimeAgo from 'react-timeago';

import Paper from 'material-ui/Paper';

import {
	fetchTopic
} from '../../actions/topic';


const styles = {
	article: {
		margin: '0 auto',
		padding: 20,
		marginTop: 10,
		maxWidth: 960,
		minWidth: 320
	},
	simditor: {
		border: 0,
	},
	"simditor-body": {
		paddingTop: 15,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 0,
		minHeight: 0
	},
	title: {
		textAlign: 'center',
	},
	intro: {
		display: "inherit",
		textAlign: 'center',
		color: "rgba(0,0,0,0.4)"
	}
}

class TopicShow extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		let {
			params,
			fetchTopic
		} = this.props;
		fetchTopic(params.id);
	}
	render() {
		let {
			article
		} = this.props;
		const paperArticle = article.title === undefined ? (
			<h3>没有该文章，请返回继续查看</h3>
		) : (
			<div>
			<h3 style={styles.title}>{article.title}</h3>
			<small style={styles.intro}>
				<Link style={{color: "rgba(0,0,0,0.4)", textDecoration: 'underline'}} to={`/users/${article.author_username}`}>{article.author_username}</Link> ·
				<Link style={{color: "rgba(0,0,0,0.4)", textDecoration: 'underline'}} to={`/nodes/${article.node_id}`}>{article.node_title}</Link> ·
				<TimeAgo date={article.created_at} /></small>
			<div className="simditor" style={styles.simditor}>
				<div dangerouslySetInnerHTML={{__html: article.body}} className="simditor-body" style={styles["simditor-body"]} />
			</div>
			</div>
		)
		return (
			<Paper zDepth={1} style={styles.article}>{paperArticle}</Paper>
		)
	}
}

function mapStateToProps(state) {
	return {
		article: state.topics.article
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchTopic: (id) => {
			dispatch(fetchTopic(id))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicShow);
