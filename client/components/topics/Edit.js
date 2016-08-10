import React, {
	Component
} from 'react';

import {
	connect
} from 'react-redux';

import {
	browserHistory
} from 'react-router';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import {
	fetchNodes
} from "../../actions/node";

import {
	putTopic,
	fetchTopic,
	isSucc
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
class TopicEdit extends Component {
	constructor(props) {
		super(props)
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
			params,
			fetchTopic,
			fetchNodes,
			article
		} = this.props;
		fetchNodes();
		if (params) {
			fetchTopic(params.id);
		}
	}

	_handleChange(event, index, value) {
		this.setState({
			node_val: value,
			node_valErro: ''
		})
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.article && !this.state.node_val) {
			this.setState({
				body: nextProps.article.body,
				node_val: nextProps.article.node_id
			})
		}
		if (nextProps.isSuccess === "success") {
			let {
				isSucc
			} = this.props;
			isSucc('');
			let redirect_url = `/articles/${nextProps.article.id}`;
			browserHistory.push(redirect_url);
		}
	}

	handleEditorChange(value) {
		this.setState({
			body: value,
			bodyErro: ''
		})
	}

	submitFrom() {
		let {
			node_val,
			body
		} = this.state;
		let title = this.refs.title.getValue();
		let {
			article
		} = this.props;
		let node_id = node_val || article.node_id;
		let body_html = body || article.body;
		let error = false;
		if (!title) {
			error = true;
			this.setState({
				titleErro: "不能为空"
			});
		}
		if (!body_html) {
			error = true;
			this.setState({
				bodyErro: "不能为空"
			});
		}
		if (!node_id) {
			error = true;
			this.setState({
				node_valErro: "不能为空"
			})
		}
		if (!error) {
			let {
				putTopic
			} = this.props;
			putTopic(article.id, {
				title: title,
				body: body,
				node_id: node_id,
				old_node_id: article.node_id
			});
		}

	}

	_handleInputChange() {
		this.setState({
			titleErro: ""
		});
	}

	render() {
		let {
			article,
			login_user,
			nodes,
			is_fetching
		} = this.props;
		let {
			node_valErro,
			titleErro,
			bodyErro
		} = this.state;
		if (!(login_user && login_user.username === article.author_username) || Object.keys(article).length == 0) {
			return <div></div>
		}
		return (
			<Paper zDepth={1} style={styles.article}>
        编辑文章
        <NodeList
          nodes={nodes}
          defaultValue={this.state.node_val || article.node_id}
          onChange={this._handleChange.bind(this)}
          errorText={node_valErro}
          />
			    <br />
			  <TextField
			      hintText="标题"
			      floatingLabelText="标题"
			      fullWidth={true}
						errorText={titleErro}
            defaultValue={article.title}
			      ref='title'
			      key='title'
						style={styles.textField}
						onChange={this._handleInputChange.bind(this)}
			    />
			    <br />
					<DefaultEditor
						body={this.state.body || article.body}
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
		article: state.topics.article,
		nodes: state.nodes.nodes,
		is_fetching: state.topics.isFetching,
		login_user: state.login.login_user,
		isSuccess: state.topics.isSuccess
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchTopic: (id) => {
			dispatch(fetchTopic(id))
		},
		fetchNodes: () => {
			dispatch(fetchNodes())
		},
		putTopic: (id, topic) => {
			dispatch(putTopic(id, topic))
		},
		isSucc: (status) => {
			dispatch(isSucc(status))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicEdit);