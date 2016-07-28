import React, {
  Component
} from 'react';

import {
  connect
} from 'react-redux';

import {
  fetchNode
} from '../../actions/node';
import Loading from '../../common/Loading';
import Article from '../topics/Article';

import {
	blue500,
	yellow600,
  grey300
} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import {
	DOMAIN_EX
} from '../../constants/address';

const styles = {
	node: {
		margin: '0 auto',
		padding: 20,
		paddingBottom: 40,
		marginTop: 10,
		maxWidth: 960,
		minWidth: 320
	},
  nodeIntro: {
    marginRight: 10,
    float: 'left',
  },
  subHeader: {
    marginBottom: 15,
    lineHeight: 2,
    fontWeight: 0,
    color: "rgba(0,0,0,0.6)"
  },
	article: {
			margin: '0 auto',
			paddingLeft: 20,
			paddingBottom: 5
	}
}

class NodeShow extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let {
      fetchNode,
      params
    } = this.props;
    fetchNode(params.id)
  }

  render() {
    let { node, isFetching, fetch_node_error } = this.props;

		if(isFetching===true){
			return(<Loading />)
		}

    if(!node) {
      return (
  			<Paper zDepth={1} style={styles.node}>
  				<h3>{fetch_node_error}</h3>
  			</Paper>
      );
    }

		let listItem;
		if (node.articles.length > 0) {
			listItem = node.articles.map((val) => {
				return <Article article={val} key={val.id} />
			})
		} else {
			listItem = <div style={styles.article}>
						<h3>还没有文章</h3>
					</div>
		}
    return(
      <div>
    			<Paper zDepth={1} style={styles.node}>
            <Subheader style={styles.subHeader}>
              <FloatingActionButton backgroundColor={grey300} style={{marginRight: 14}}>
                <img src={DOMAIN_EX + node.image_url} />
              </FloatingActionButton>
              {node.summary}
            </Subheader>
            <Divider />
            {listItem}
    			</Paper>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    node: state.nodes.node,
    isFetching: state.nodes.isFetching,
    fetch_node_error: state.nodes.fetch_node_error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchNode: (id) => {
      dispatch(fetchNode(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeShow);
