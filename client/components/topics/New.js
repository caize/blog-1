import React, {
	Component
} from 'react';

import {
	connect
} from 'react-redux';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import {
	browserHistory
} from 'react-router';

import {
	fetchNodes
} from "../../actions/node";

import {
	postTopic
} from "../../actions/topic";

import DefaultEditor from './DefaultEditor';
import NodeList from './NodeList';

const styles = {
	article: {
		margin: '0 auto',
		padding: 20,
		paddingBottom: 80,
		marginTop: 10,
		maxWidth: 960,
		minWidth: 320
	},
	button: {
		marginTop: 20,
		float: 'right'
	},
	textField: {
		display: 'block',
		width: '100%',
		marginTop: -10
	},
}

class TopicNew extends Component {
	constructor(props) {
		super(props);
		this.state = {
			node_val: '',
			title: '',
			body: '',
			bodyErro: '',
			titleErro: '',
			node_valErro: ''
		};
	}

	componentDidMount() {
			let {
				fetchNodes
			} = this.props;
			fetchNodes();
	}

	_handleChange(event, index, value) {
		this.setState({
			node_val: value,
			node_valErro: ''
		})
	}

	componentWillReceiveProps(nextProps) {
		let new_articles = nextProps.topics.articles;
		let old_articles = this.props.topics.articles;
		if(new_articles.length > old_articles.length) {
			browserHistory.push(`/articles/${new_articles[0].id}`);
		}
	}

	handleEditorChange(value) {
		this.setState({
			body: value,
			bodyErro: ''
		})
	}

	submitFrom() {
		let {node_val, body} = this.state;
		let title = this.refs.title.getValue();
		let error = false;
		if(!title) {
				error = true;
				this.setState({
					titleErro: "不能为空"
				});
		}
		if(!body) {
			error = true;
			this.setState({
				bodyErro: "不能为空"
			});
		}
		if(!node_val) {
			error = true;
			this.setState({
				node_valErro: "不能为空"
			})
		}

		if(!error) {
			let { postTopic } = this.props;
			postTopic({title: title, body: body, node_id: node_val});
		}

	}

	_handleInputChange() {
			this.setState({
				titleErro: ""
			});
	}

	render() {
		let { node_val, node_valErro, titleErro, body, bodyErro } = this.state;
		let { nodes, login_user, is_fetching } = this.props;
		if(!login_user || !login_user.token) {
			return <Paper zDepth={1} style={styles.article}><div>请返回主页面</div></Paper>;
		}
		return (
			<Paper zDepth={1} style={styles.article}>
				添加新文章
					<NodeList
						nodes={nodes}
						defaultValue={node_val}
						onChange={this._handleChange.bind(this)}
						errorText={node_valErro}
						/>
			    <br />
			  <TextField
			      hintText="标题"
			      floatingLabelText="标题"
			      fullWidth={true}
						errorText={titleErro}
			      ref='title'
			      key='title'
						style={styles.textField}
						onChange={this._handleInputChange.bind(this)}
			    />
			    <br />
					<DefaultEditor
						body={body}
						onChange={this.handleEditorChange.bind(this)}
						floatingLabelText="正文"
						errorText={bodyErro}
						image_type="Article"
						/>
			  <RaisedButton
					label="提交"
					onMouseDown={this.submitFrom.bind(this)}
					primary={true}
					style={styles.button}
					disabled={is_fetching}
					/>
			</Paper>
		)
	}
}

function mapStateToProps(state) {
	return {
		nodes: state.nodes.nodes,
		login_user: state.login.login_user,
		is_fetching: state.topics.isFetching
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchNodes: () => {
			dispatch(fetchNodes())
		},
		postTopic: (topic) => {
			dispatch(postTopic(topic))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicNew);
