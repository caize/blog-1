import fetch from "isomorphic-fetch";
import React, {
	Component
} from 'react';

import {
	connect
} from 'react-redux';

import Dialog from 'material-ui/Dialog';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Upload from 'material-ui/svg-icons/file/file-upload';
import {
	postNode,
	putNode,
	requestNode,
	nodeSuccess
} from '../../actions/node';

import {
	DOMAIN_EX,
	IMAGES
} from '../../constants/address';

const styles = {
	dialogTitle: {
		fontSize: 20,
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 18
	},
	fileupload: {
		marginTop: 20
	},
	textField: {
		display: 'block',
		width: '100%',
		marginTop: -10
	},
	exampleImageInput: {
		cursor: 'pointer',
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		width: '100%',
		opacity: 0
	}
}

class Modal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			titleError: '',
			summaryError: '',
			imageError: '',
			imageUrl: '',
			imageId: '',
		};
	}

	_handleInputChange(name) {
		switch (name) {
			case 'title':
				this.setState({
					titleError: ""
				});
				break;
			case 'summary':
				this.setState({
					summaryError: ""
				});
				break;
			default:
				break;
		}
	}

	submitForm() {
		let {
			node
		} = this.props;
		let title = this.refs.title.getValue();
		let summary = this.refs.summary.getValue();
		let error = false;
		let imageUrl = this.state.imageUrl || node.image_url;
		let imageId = this.state.imageId || node.image_id;
		if (!title) {
			error = true;
			this.setState({
				titleError: '不能为空'
			})
		}
		if (!summary) {
			error = true;
			this.setState({
				summaryError: "不能为空"
			})
		}

		if (!imageUrl) {
			error = true;
			console.log('imageUrl', imageUrl);
			this.setState({
				imageError: "图片不能为空"
			})
		}

		if (!error) {
			this.setState({
				titleError: '',
				summaryError: '',
				imageError: '',
			});
			let {
				postNode,
				putNode
			} = this.props;
			if(node.id) {
				putNode(node.id, title, summary, imageId);
			}else {
				postNode(title, summary, imageId);
			}
		}
	}

	handleChange(e) {
		e.preventDefault();
		let API_URL = IMAGES;
		let file = e.target.files[0];
		var data = new FormData()
		data.append('image[image]', file)
		data.append('image[image_type]', "Node")
		fetch(API_URL, {
				method: 'POST',
				headers: new Headers({
					Authorization: `Token token=${this.props.login_user.token}`
				}),
				body: data
			})
			.then(response => response.json())
			.then(json => {
				this.setState({
					imageUrl: DOMAIN_EX + json["image"]["image_url"],
					imageId: json["image"]["id"]
				})
			})
	}

	componentWillReceiveProps(nextProps) {
		let {
			node_error,
			nodeSuccess,
			node_success
		} = nextProps;
		if(node_success==="success") {
			nodeSuccess("fail");
			this.props.handleClose();
		}
		this.setState({
			titleError: !node_error.title ? '' : node_error.title.join(' '),
			summaryError: !node_error.summary ? '' : node_error.summary.join(' '),
			imageError: !node_error.image_id ? '' : node_error.image_id.join(' '),
		})
	}

	render() {
		const actions = [
			<FlatButton label="取消"
	        primary={true}
	        onTouchTap={this.props.handleClose}
	      />,
			<FlatButton label="提交"
	        primary={true}
	        keyboardFocused={true}
	        onTouchTap={this.submitForm.bind(this)}
	      />,
		];
		let {node} = this.props;
		let title = !node.title ? "添加节点" : "编辑节点";
		let src = node.image_url ? `${DOMAIN_EX + node.image_url}` : "";
		
		return (
			<Dialog
		          title={title}
		          actions={actions}
		          modal={false}
		          open={this.props.open}
		          onRequestClose={this.props.handleClose}
		          autoScrollBodyContent={true}
		        >
				  <TextField
			      	hintText="不能为空"
			        floatingLabelText="节点名"
					  	errorText={this.state.titleError}
							defaultValue={node.title}
				      fullWidth={true}
				      ref='title'
				      key='title'
				      onChange={this._handleInputChange.bind(this, 'title')}
				      style={styles.textField}
				    />
				    <br />
				  <TextField
			      	hintText="不能为空"
			        floatingLabelText="节点简介"
					  	errorText={this.state.summaryError}
							defaultValue={node.summary}
				      fullWidth={true}
				      ref='summary'
				      key='summary'
				      multiLine={true}
				      rows={2}
				      onChange={this._handleInputChange.bind(this,'summary')}
				      style={styles.textField}
				    />
				    <br />
			        <Avatar
			          icon={<Upload />}
			          src={this.state.imageUrl || src}
			          size={100}
			          style={styles.fileupload}
			        />
						<small style={{color: 'red'}}>{ this.state.imageError }</small>
				    <br />
				    <RaisedButton label="点击上传节点图标" style={styles.fileupload} icon={<Upload />} labelPosition="before">
					  	<input type="file" key="image" ref="image" onChange={this.handleChange.bind(this)} style={styles.exampleImageInput} />
						</RaisedButton>
				    <br />
		        </Dialog>
		)
	}
}

function mapStateToProps(state) {
	return {
		login_user: state.login.login_user,
		node_error: state.nodes.node_error,
		node_success: state.nodes.node_success
	}
}

function mapDispatchToProps(dispatch) {
	return {
		postNode: (title, summary, imageId) => {
			dispatch(postNode(title, summary, imageId))
		},
		putNode: (id, title, summary, imageId) => {
			dispatch(putNode(id, title, summary, imageId))
		},
		nodeSuccess: (status) => {
			dispatch(nodeSuccess(status))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
