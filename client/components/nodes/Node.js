import React, {
	Component
} from 'react';

import {
	connect
} from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import {
	List
} from 'material-ui/List';

import Modal from './Modal';
import NodeItem from './NodeItem';
import {
	deleteNode,
	nodeError
} from '../../actions/node';

const styles = {
	button: {
		float: 'right',
		marginTop: -50
	},
	list: {
		marginTop: 55
	},
	listC: {
		marginTop: 20
	}
}

class Node extends Component {
	constructor(props) {
		super(props);
		this.listNodes = this.listNodes.bind(this);
		this.state = {
			open: false,
			node: {}
		}
	}

	deleteNode(id) {
		let {
			deleteNode
		} = this.props;
		deleteNode(id);
	}

	editNode(id) {
		let {
			nodes
		} = this.props;
		let node = nodes.find((val) => {
			return val.id.toString() === id.toString()
		});
		this.setState({
			node: node
		});
		this.handleOpen();
	}

	addNode() {
		this.setState({
			node: {}
		});
		this.handleOpen();
	}

	handleOpen() {
		let {
			nodeError
		} = this.props;
		nodeError({});
		this.setState({
			open: true
		});
	}

	handleClose() {
		this.setState({
			open: false
		});
	}

	listNodes() {
		let {
			nodes
		} = this.props;

		if (nodes.length === 0) {
			return <h3>还没有创建节点</h3>
		}
		return nodes.map((val) => {
			return <NodeItem
									{...this.props}
									node={val}
									editNode={this.editNode.bind(this)}
									deleteNode={this.deleteNode.bind(this)}
									key={val.id}
									/>
		})
	}
	render() {
		let {
			login_user
		} = this.props;
		const addNode = (login_user && login_user.admin ? <RaisedButton label="添加节点" onClick={this.addNode.bind(this)} primary={true} style={styles.button} /> : "");
		return (
			<div>
				{addNode}
				<List style={login_user && login_user.admin ? styles.list : styles.listC}>
					{ this.listNodes() }
					<Modal node={this.state.node} open={this.state.open} handleClose={this.handleClose.bind(this)}/>
				</List>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		login_user: state.login.login_user,
		nodes: state.nodes.nodes
	}
}

function mapDispatchToProps(dispatch) {
	return {
		deleteNode: (id) => {
			dispatch(deleteNode(id));
		},
		nodeError: (json) => {
			dispatch(nodeError(json))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Node);