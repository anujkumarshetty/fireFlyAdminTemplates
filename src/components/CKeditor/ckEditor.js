import React, { Component } from 'react'
import CKEditor from "react-ckeditor-component";




const toolbarConfig = {
  height: '250px',
  toolbar: 'Full',
  allowedContent: true,
  startupFocus: true,
};

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.afterPaste = this.afterPaste.bind(this);
  }


  onChange(evt) {
    console.log("onChange fired with event info: ", evt);
    var newContent = evt.editor.getData();
    this.props.CKData(newContent);
  }

  onBlur(evt) {
    console.log("onChange fired with event info: ", evt);
  }

  afterPaste(evt) {
    console.log("onChange fired with event info: ", evt);
  }

  render() {
    return (
      <div>
        {/* {this.props.ckContent} */}
        <CKEditor
          activeClass="p10"
          config={toolbarConfig}
          content={this.props.ckContent}
          events={{
            "blur": this.onBlur,
            "afterPaste": this.afterPaste,
            "change": this.onChange
          }}
        />
      </div>
    )
  }
}