import React, {
	Component
} from 'react';
import Snackbar from 'material-ui/Snackbar';
import {
	connect
} from 'react-redux';
import {
	loginError
} from '../actions/login';

class Error extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		let {
			error,
			time
		} = this.props;
		if ((error !== null) && (error !== undefined) && (error !== 'undefined')) {
			return (
				<div>
					<Snackbar
				          open={true}
				          message={error}
				          autoHideDuration={4000}
				          />
			    </div>
			)

		} else {
			return (<div></div>)
		}
	}
}

export default connect()(Error);