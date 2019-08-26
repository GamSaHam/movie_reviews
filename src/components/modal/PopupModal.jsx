import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';

class PopupModal extends Component {
  state = {};

  render() {
    const { isShow, handleClose, msg } = this.props;

    return (
      <Modal
        show={isShow}
        onHide={() => {
          handleClose(0);
        }}
      >
        <Modal.Body
          className="d-flex justify-content-center"
          style={{ height: '110px' }}
        >
          <span className="align-self-center">{msg}</span>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-primary"
            variant="secondary"
            onClick={() => {
              handleClose(1);
            }}
          >
            확인
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default PopupModal;
