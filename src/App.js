import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import _ from 'lodash';

import auth from './services/authService';

import SideBar from './components/SideBar';
import Home from './components/Home';
import Reviews from './components/Reviews';
import Review from './components/Review';
import Header from './components/Header';
import Write from './components/Write';
import BoardReviews from './components/BoardReviews';

import LoginModal from './components/modal/LoginModal';
import RegisterModal from './components/modal/RegisterModal';
import ConfirmModal from './components/modal/ConfirmModal';
import PopupModal from './components/modal/PopupModal';

import CustomImageEditor from './components/CustomImageEditor';

import history from './history';

import './App.scss';

class App extends Component {
  componentDidMount() {
    this.setState({ user: auth.getCurrentUser() });
  }

  state = {
    isShowLoginModal: false,
    isShowConfirmModal: false,
    isShowRegisterModal: false,
    isShowPopup: false,
    user: {},
    confirmModalCallback: {},
    popupMessage: '',
    confirmPopupMessage: '',
    location: '',
    popupCallback: function() {}
  };

  showLoginModal = isShowLoginModal => {
    this.setState({ isShowLoginModal });
  };

  showRegisterModal = isShowRegisterModal => {
    this.setState({ isShowRegisterModal });
  };

  showPopup = message => {
    this.setState({ popupMessage: message });
    this.setState({ isShowPopup: true });
    this.setState({ popupCallback: this.popupClose });
  };

  popupClose = () => {
    this.setState({ isShowPopup: false });
  };

  handleLogout = () => {
    this.setState({ isShowConfirmModal: true });
    this.setState({ confirmPopupMessage: '로그아웃 하시겠습니까?' });
    this.setState({ confirmModalCallback: this.logoutCallback });
  };

  handleLogin = () => {
    this.setState({ user: auth.getCurrentUser() });

    if (this.state.location !== '') {
      history.push(this.state.location);
      this.setState({ location: '' });
    }
  };

  logoutCallback = ret => {
    this.setState({ isShowConfirmModal: false });

    if (ret === 1) {
      auth.logout();
      history.push('/');
      this.setState({ user: {} });
    }
  };

  handleLoginCheck = path => {
    if (!_.isEmpty(this.state.user)) {
      history.push(path);
    } else {
      this.setState({ popupMessage: '로그인이 필요한 서비스입니다.' });
      this.setState({ isShowPopup: true });
      this.setState({
        popupCallback: this.callbackShowLoginModal
      });

      this.setState({ location: path });
    }
  };

  callbackShowLoginModal = ret => {
    if (ret === 1) {
      this.setState({ isShowPopup: false });
      this.setState({ isShowLoginModal: true });
    } else {
      this.setState({ isShowPopup: false });
    }
  };

  render() {
    return (
      <div className="my-font">
        <div className="d-flex  m-0 p-0 " id="wrapper">
          <SideBar onCheckLogin={this.handleLoginCheck} />

          <div className="main" style={{ width: '100%' }}>
            <div className="container-fluid bg-light">
              <Header
                user={this.state.user}
                onShowModal={this.showLoginModal}
                onLogout={this.handleLogout}
              />
              <Switch>
                <Route path="/main" render={props => <Home {...props} />} />
                <Route path="/reviews" component={Reviews} />
                <Route path="/review/:id" component={Review} />
                <Route
                  path="/write/:id"
                  render={props => (
                    <Write {...props} showPopup={this.showPopup} />
                  )}
                />
                <Route
                  path="/board_reviews/:page?/:search?"
                  component={BoardReviews}
                />

                <Redirect from="/" exact to="/main" />
              </Switch>
            </div>
            <footer id="main-footer" className="bg-dark text-white">
              <div className="container">
                <div className="row text-center">
                  <div className="col-md-6 ml-auto">
                    <p className="lead">
                      Copyright &copy; <span id="year" />
                    </p>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>

        <PopupModal
          isShow={this.state.isShowPopup}
          msg={this.state.popupMessage}
          handleClose={this.state.popupCallback}
        />
        <ConfirmModal
          isShow={this.state.isShowConfirmModal}
          message={this.state.confirmPopupMessage}
          onResponse={this.state.confirmModalCallback}
        />
        <LoginModal
          onShowModal={this.showLoginModal}
          onShowRegisterModal={this.showRegisterModal}
          isShow={this.state.isShowLoginModal}
          onLogin={this.handleLogin}
        />
        <RegisterModal
          isShow={this.state.isShowRegisterModal}
          onShowModal={this.showRegisterModal}
        />
      </div>
    );
  }
}

export default App;
