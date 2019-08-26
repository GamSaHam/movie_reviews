import React, { Component } from 'react';
import styles from './ImageAdd.scss';

export default class ImageAdd extends Component {
  // Start the popover closed
  state = {
    imageURL: ''
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = files => {
    if (files.length > 0) {
      const data = new FormData();
      data.append('file', files[0]);
      // data.append('filename', this.fileName.value);
      console.log('uploading');
      fetch('http://localhost:3900/upload', {
        method: 'POST',
        body: data
      }).then(response => {
        response.json().then(body => {
          this.setState({ imageURL: `http://localhost:3900${body.file}` });
          console.log(this.state.imageURL);
          this.addImage();
        });
      });
    }
  };

  addImage = () => {
    const { editorState, onChange } = this.props;
    console.log(this.state.imageURL);
    onChange(this.props.modifier(editorState, this.state.imageURL));
  };

  render() {
    return (
      <React.Fragment>
        <a className="btn btn-light">
          <label class="custom-file-upload">
            <input
              type="file"
              className="d-none"
              onChange={e => this.handleChange(e.target.files)}
            />
            <i class="far fa-images"></i>
          </label>
        </a>
      </React.Fragment>
    );
  }
}

//<img src={this.state.imageURL} alt="img" />

/*
          <input
            type="text"
            placeholder="Paste the image url …"
            className={styles.addImageInput}
            onChange={this.changeUrl}
            value={this.state.url}
          />
 <button className="" type="button" onClick={this.addImage}></button>
*/
