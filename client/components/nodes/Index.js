import React, {
	Component
} from 'react';

import {
	connect
} from 'react-redux';

import Paper from 'material-ui/Paper';
import Node from './Node';
import Loading from '../../common/Loading';

import {
	fetchNodes
} from '../../actions/node';

const styles = {
	node: {
		margin: '0 auto',
		padding: 20,
		paddingBottom: 40,
		marginTop: 10,
		maxWidth: 960,
		minWidth: 320
	},
}

class NodeIndex extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		let {
			fetchNodes
		} = this.props;
		fetchNodes();
	}

	render() {
		let {
			isFetching
		} = this.props;
		if(isFetching===true){
			return(<Loading />)
		}
		return (
			<Paper zDepth={1} style={styles.node}>
				<Node  {...this.props}/>
			</Paper>
		)

	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchNodes: () => {
			dispatch(fetchNodes())
		}
	}
}

function mapStateToProps(state) {
	return {
		isFetching: state.nodes.isFetching
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeIndex);
