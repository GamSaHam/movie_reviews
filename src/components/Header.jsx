import React, { Component } from 'react';
import auth from '../services/authService';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class Header extends Component {
  state = {};

  render() {
    const { onShowModal, onLogout, user, onCheckLogin } = this.props;

    return (
      <div>
        <div className="border-bottom d-block d-md-none">
          <nav className=" d-flex justify-content-end navbar shadow-none navbar-light bg-light">
            <div className="mt-1">
              <a href="#">{user.name + '님'}</a>
              <button
                className="ml-2 btn btn-primary"
                onClick={() => onLogout()}
              >
                로그아웃
              </button>
            </div>
            <button
              className="navbar-toggler ml-2"
              type="button"
              data-toggle="collapse"
              data-target="#navbarToggleExternalContent"
              aria-controls="navbarToggleExternalContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </nav>
          <div className="collapse " id="navbarToggleExternalContent">
            <div className="bg-light p-4">
              <Link to="/">영화홈</Link>
            </div>
            <div className="bg-light p-4">
              <Link to="/reviews">영화리뷰</Link>
            </div>
            <div className="bg-light p-4">
              <Link onClick={() => onCheckLogin('/write/new')}>
                리뷰작성하기
              </Link>
            </div>
          </div>
        </div>

        <div
          className="border-bottom d-none d-md-block"
          style={{ width: '100%' }}
        >
          <div className="d-flex justify-content-end ml-5 mr-5">
            {_.isEmpty(user) ? (
              <div className="ml-2 p-1">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => onShowModal(true)}
                >
                  Login
                </button>
              </div>
            ) : (
              <div className="mt-1">
                <a href="#">{user.name + '님'}</a>
                <button
                  className="ml-2 btn btn-primary"
                  onClick={() => onLogout()}
                >
                  로그아웃
                </button>
              </div>
            )}

            <div className="ml-5 p-1 ">
              <form className="form-inline my-2 my-lg-0">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="통합검색"
                  aria-label="통합검색"
                />
                <button
                  className="btn btn-outline-primary my-2 my-sm-0 "
                  type="submit"
                >
                  검색
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
