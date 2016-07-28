import React, {
  Component
} from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class NodeList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
		let { nodes, defaultValue, onChange } = this.props;
		const items = nodes.map((val) => {
			return <MenuItem key={val.id} value={val.id} primaryText={val.title} />
		});
    return (
        <SelectField
          value={defaultValue}
          floatingLabelText="节点"
          onChange={onChange}
          fullWidth={true}
          errorText={this.props.errorText}
        >
          {items}
        </SelectField>
    )
  }
}

export default NodeList;
