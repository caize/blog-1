import React, {	Component } from 'react';

import { connect } from 'react-redux';

import { fetchTopics } from '../actions/topic';

import Article from './topics/Article';
import Paper from 'material-ui/Paper';

const styles = {
	articles: {
		margin: '0 auto',
		padding: 20,
		marginTop: 10,
		maxWidth: 960,
		minWidth: 320
	},
	article: {
			margin: '0 auto',
			paddingLeft: 20,
			paddingBottom: 5
	}
}


class Index extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		let {
			fetchTopics
		} = this.props;
		fetchTopics();
	}

	render() {
		let {
			articles,
			meta
		} = this.props;

		let listItem;
		if (articles.length > 0) {
			listItem = articles.map((val) => {
				return <Article article={val} key={val.id} />
			})
		} else {
			listItem = <div style={styles.article}>
						<h3>还没有文章</h3>
					</div>
		}
		return (
			<Paper zDepth={1} key="articles" style={styles.articles}>
					{listItem}
			</Paper>
		)
	}
}


function mapStateToProps(state) {
	return {
		articles: state.topics.articles,
		meta: state.topics.meta
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchTopics: () => {
			dispatch(fetchTopics())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
