import React, {
	Component
} from 'react';

import {
	Link
} from 'react-router';

import {
	connect
} from 'react-redux';


import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';

const styles = {
	innerDiv: {
		textDecoration: 'none',
	},
	link: {
		display: 'block',
		color: '#212121'
	}
}

class SideBar extends Component {
	constructor(props) {
		super(props);
	}
	noLoginedMenu() {
		return [{
			link: "/",
			text: "首页"
		}, {
			link: "/nodes",
			text: "节点"
		}, {
			link: "/login",
			text: "登录"
		}, {
			link: "/signup",
			text: "注册"
		}]
	}

	LoginedMenu() {
		return [{
			link: `/user/${this.props.login_user.username}`,
			text: this.props.login_user.username
		}, {
			link: "/",
			text: "首页"
		}, {
			link: "/nodes",
			text: "节点"
		}, {
			link: "/articles/new",
			text: "新建文章"
		}, {
			link: this.props.HandleLogout,
			text: "退出"
		}]
	}
	render() {
		let listMenus = this.props.loggedIn ? this.LoginedMenu().map((val) => {
			if (typeof(val.link) === "string") {
				return <MenuItem innerDivStyle={styles.innerDiv} key={val.text} onTouchTap={this.props.handleClose}><Link style={styles.link} to={val.link}>{val.text}</Link></MenuItem>
			} else {
				return <MenuItem innerDivStyle={styles.innerDiv} key={val.text} onTouchTap={val.link}>{val.text}</MenuItem>
			}
		}) : this.noLoginedMenu().map((val) => {
			return <MenuItem innerDivStyle={styles.innerDiv} key={val.text} onTouchTap={this.props.handleClose}><Link style={styles.link} to={val.link}>{val.text}</Link></MenuItem>
		})
		return (
			<Drawer
	          docked={false}
	          width={200}
	          open={this.props.open}
	          onRequestChange={(open) => this.props.dealRequest(open)}
	        >
	        	<Subheader>瞬间即永恒</Subheader>
			    {listMenus}
			</Drawer>
		)
	}
}

export default connect()(SideBar);
