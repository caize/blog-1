import React, {
  Component
} from 'react';

import HtmlField from '../../common/HtmlField';
import {
  IMAGES
} from '../../constants/address';

class DefaultEditor extends Component {
  constructor(props) {
    super(props)
  }

	handleEditorChange() {
		let editor = this.refs.editor;
    this.props.onChange(editor.getValue());
	}
  render() {
    let { image_type, body, floatingLabelText, errorText } = this.props;
    let token = localStorage.getItem('token');
  		const editorConfig = {
  			placeholder: "正文......",
  			upload: {
  				url: IMAGES + '/upload_file',
  				params: {image_type: image_type, token: token},
  				fileKey: 'image',
  				connectionCount: 3,
  				leaveConfirm: '正在上传文件'
  			},
  			toolbar: [
  					'title',
  					'bold',
  					'italic',
  					'underline',
  					'strikethrough',
  					'fontScale',
  					'color',
  					'ol',
  					'ul',
  					'blockquote',
  					'code',
  					'table',
  					'link',
  					'image',
  					'hr',
  					'indent',
  					'outdent',
  					'alignment',
  				]
  		}
    return(
      <HtmlField
        value={body}
        floatingLabelText={floatingLabelText}
        ref="editor"
        errorText={errorText}
        onChange={this.handleEditorChange.bind(this)}
        {...editorConfig}
         />
    )
  }
}

export default DefaultEditor;
