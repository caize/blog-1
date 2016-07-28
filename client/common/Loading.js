import React, {
	Component
} from 'react';

import CircularProgress from 'material-ui/CircularProgress';

const style = {
	container: {
		textAlign: 'center',
		marginTop: 20,
	},
	loading: {
		fontSize: 14,
	}
};
class Loading extends Component {
	render() {
		return (
			<div style={style.container}>
			    <CircularProgress size={0.7} />
			    <p style={style.loading}>正在加载...</p>
			</div>
		)
	}
}

export default Loading;
