import React, { Component } from 'react';
import Joi from 'joi-browser';
import Modal from 'react-bootstrap/Modal';
import * as userService from '../../services/userService';
import auth from '../../services/authService';
import Form from '../common/form';

class RegisterModal extends Form {
  state = {
    data: { username: '', password: '', name: '' },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .email()
      .label('Username'),
    password: Joi.string()
      .required()
      .min(5)
      .label('Password'),
    name: Joi.string()
      .required()
      .label('Name')
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers['x-auth-token']);

      this.props.onShowModal(false);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const { isShow, onShowModal } = this.props;

    return (
      <Modal show={isShow} onHide={() => onShowModal(false)}>
        <form onSubmit={this.handleSubmit}>
          <Modal.Header>회원가입</Modal.Header>

          <Modal.Body>
            {this.renderInput('username', 'Username')}
            {this.renderInput('password', 'Password', 'password')}
            {this.renderInput('name', 'Name')}
          </Modal.Body>
          <Modal.Footer>
            {this.renderButton('Register')}
            <button
              className="btn btn-primary"
              onClick={() => onShowModal(false)}
            >
              취소
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

export default RegisterModal;
