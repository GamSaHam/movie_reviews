import React, { Component } from 'react';

import Joi from 'joi-browser';
import Form from '../common/form';
import auth from '../../services/authService';
import Modal from 'react-bootstrap/Modal';

class LoginModal extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {},
    show: false
  };

  schema = {
    username: Joi.string()
      .required()
      .label('Username'),
    password: Joi.string()
      .required()
      .label('Password')
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;

      await auth.login(data.username, data.password);

      this.props.onShowModal(false);
      this.props.onLogin();
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const { isShow, onShowModal, onShowRegisterModal } = this.props;

    return (
      <div>
        <Modal
          show={isShow}
          onHide={() => {
            onShowModal(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>로그인</Modal.Title>
          </Modal.Header>
          <form onSubmit={this.handleSubmit}>
            <Modal.Body>
              {this.renderInput('username', '아이디')}
              {this.renderInput('password', '비밀번호', 'password')}
              <p>
                회원이 아니세요?{' '}
                <a
                  href="#"
                  className="btn btn-light"
                  onClick={() => {
                    onShowModal(false);
                    onShowRegisterModal(true);
                  }}
                >
                  회원가입
                </a>
              </p>
            </Modal.Body>

            <Modal.Footer>
              {this.renderButton('로그인')}
              <button
                className="btn btn-light"
                onClick={() => onShowModal(false)}
              >
                취소
              </button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

export default LoginModal;
