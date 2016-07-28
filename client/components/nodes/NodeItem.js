import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';

import {
	browserHistory
} from 'react-router';

import {
	List,
	ListItem
} from 'material-ui/List';

import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import {
	blue500,
	yellow600
} from 'material-ui/styles/colors';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import {
	DOMAIN_EX
} from '../../constants/address';

class NodeItem extends Component {
	constructor(props) {
		super(props)
	}

	handleOnRequestChange(event, object) {
		if (object.key === "edit") {
			this.props.editNode(object.props.value);
		} else if (object.key === "delete") {
			if (confirm("确定删除吗?")) {
				this.props.deleteNode(object.props.value);
			}
		}
	}

	redirectToArticles(id) {
		browserHistory.push(`/nodes/${id}`);
	}

	render() {
		let {
			node
		} = this.props;
		const iconButtonElement = (
			<IconButton
        touch={true}
        tooltip="更多操作"
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={blue500} />
      </IconButton>
		);
		const rightIconMenu = (
			<IconMenu
				iconButtonElement={iconButtonElement}
				key={node.id}
				onItemTouchTap={this.handleOnRequestChange.bind(this)}
			>
        <MenuItem value={node.id} key="edit" >编辑</MenuItem>
        <MenuItem value={node.id} key="delete" >删除</MenuItem>
      </IconMenu>
		);

		if (this.props.admin) {
			return (
				<ListItem
						leftAvatar={<Avatar icon={<FileFolder />}
						src={DOMAIN_EX + node.image_url} />
			}
			rightIconButton = {
				rightIconMenu
			}
			primaryText = {
				node.title
			}
			secondaryText = {
				node.summary
			}
			secondaryTextLines = {
				2
			}
			onTouchTap = {
				this.redirectToArticles.bind(this, node.id)
			}
			key = {
				node.id
			}
			/>
		)
	} else {
		return (
			<ListItem
				leftAvatar={
					<Avatar icon={<FileFolder />}
					src={DOMAIN_EX + node.image_url} />}
				primaryText = {node.title}
				secondaryText = {node.summary}
				secondaryTextLines = {2}
				onTouchTap = {this.redirectToArticles.bind(this, node.id)}
				key = {node.id}
		/>
	)
}

}
}

export default connect()(NodeItem);
