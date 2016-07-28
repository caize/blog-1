import React, {
  Component
} from 'react';

import Simditor from 'simditor';
import css from 'simditor/styles/simditor.scss';
import {
	grey400
} from 'material-ui/styles/colors';

const styles = {
      root: {
        fontSize: 16,
        lineHeight: '24px',
        width: '100%',
        display: 'block',
        position: 'relative',
        // backgroundColor: backgroundColor,
        // fontFamily: this.state.muiTheme.rawTheme.fontFamily,
        marginTop: 10
      },
      floatingLabel: {
        position: 'relative',
        color: grey400,
        marginBottom: 5,
        lineHeight: '22px',
        fontSize: '10px',
        bottom: 'none',
        opacity: 1,
        cursor: 'text',
        transform: 'scale(1) translate3d(0, 0, 0)',
        transformOrigin: 'left top',
        transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
      },
      error: {
        position: 'relative',
        bottom: 5,
        fontSize: 12,
        lineHeight: '12px',
        color: 'red',
        marginTop: 10,
        // transition: Transitions.easeOut(),
        transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
      }
    };

class HtmlField extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this._initEditor();
  }

  componentWillUnmount() {
    if (this._editor) {
      this._editor.destroy();
      this._editor = null;
    }
  }

  getValue() {
    return this._editor ? this._editor.getValue() : '';
  }

  focus() {
    this._editor && this._editor.focus();
  }

  blur() {
    this._editor && this._editor.blur();
  }

  _handleValueChange(e) {
    this.props.onChange && this.props.onChange(e);
  }

  _handleFocus(e) {
    this.props.onFocus && this.props.onFocus(e);
  }

  _handleBlur(e) {
    this.props.onBlur && this.props.onBlur(e);
  }

  _initEditor(){
    if (!this._editor && this.refs.editor) {
      let {
        placeholder,
        toolbar,
        toolbarFloat,
        toolbarFloatOffset,
        toolbarHidden,
        defaultImage,
        tabIndent,
        params,
        upload,
        pasteImage,
        cleanPaste,
        imageButton,
        allowedTags,
        allowedAttributes,
        allowedStyles,
        codeLanguages,
        locale,
        } = this.props;
      if (typeof locale !== 'undefined') {
        Simditor.locale = locale;
      }
      this._editor = new Simditor({
        textarea: this.refs.editor,
        placeholder,
        toolbar,
        toolbarFloat,
        toolbarFloatOffset,
        toolbarHidden,
        defaultImage,
        tabIndent,
        params,
        pasteImage,
        cleanPaste,
        imageButton,
        upload,
        allowedTags,
        allowedAttributes,
        allowedStyles,
        codeLanguages
      });
      this._editor.setValue(this.props.value);
      this._editor.on('valuechanged', this._handleValueChange.bind(this));
      this._editor.on('focus', this._handleFocus.bind(this));
      this._editor.on('blur', this._handleBlur.bind(this));
    }
  }

  render() {

    let {
      className,
      errorText,
      floatingLabelStyle,
      floatingLabelText,
      } = this.props;

    this._initEditor();

    let floatingLabelTextElement = floatingLabelText ? (
      <label
        style={styles.floatingLabel}
        onTouchTap={this.focus.bind(this)}>
        {floatingLabelText}
      </label>
    ) : null;

    let errorTextElement = errorText ? (
      <div style={styles.error}>{errorText}</div>
    ) : null;

    return (
      <div className={className} style={styles.root}>
        {floatingLabelTextElement}
        <textarea ref="editor"/>
        {errorTextElement}
      </div>
    )
  }
}

HtmlField.propsType = {
  className: React.PropTypes.string,
  errorStyle: React.PropTypes.object,
  errorText: React.PropTypes.node,
  floatingLabelStyle: React.PropTypes.object,
  floatingLabelText: React.PropTypes.node,
  onBlur: React.PropTypes.func,
  onChange: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  ref: React.PropTypes.string,
  hintText: React.PropTypes.string,
  style: React.PropTypes.object,
  value: React.PropTypes.string,
  locale: React.PropTypes.string,
}

export default HtmlField;
