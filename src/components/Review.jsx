import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import auth from '../services/authService';
import { toast } from 'react-toastify';

import { getReview, deleteReview } from '../services/reviewService';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

import ConfirmModal from './modal/ConfirmModal';
import PopupModal from './modal/PopupModal';
import history from '../history';

import ReadImageEditor from './ReadImageEditor';

class Review extends Component {
  state = {
    review: [],
    editorState: '',
    isFinished: false,
    isShowConfirmPopup: false,
    popupConfirmMessage: '',
    isShowPopup: false,
    popupMessage: ''
  };

  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    await this.populateReview();
  }

  async populateReview() {
    try {
      const reviewId = this.props.match.params.id;

      const { data: review } = await getReview(reviewId);

      // 불러오기 로직
      const content = review.content;
      if (content) {
        this.state.editorState = EditorState.createWithContent(
          convertFromRaw(JSON.parse(content))
        );
      }
      this.state.isFinished = true;

      this.setState({ review });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace('/not-found');
    }
  }

  handleClick = () => {
    let path = '/write/' + this.state.review._id;

    history.push(path);
  };

  handlePopupCallback = () => {
    this.props.history.push('/reviews');
  };

  handleConfirmPopupCallback = async ret => {
    this.setState({
      isShowConfirmPopup: false
    });

    if (ret === 1) {
      try {
        await deleteReview(this.state.review._id);

        //this.props.history.push('/reviews');

        this.setState({
          isShowPopup: true,
          popupMessage: '삭제되었습니다.'
        });
      } catch (ex) {
        console.log(ex);
        //if (ex.response && ex.response.status === 404)
        // toast.error('This review has already been deleted.');
      }
    }
  };

  handleDelete = () => {
    this.setState({
      isShowConfirmPopup: true,
      popupConfirmMessage: '정말로 삭제하시겠습니까?'
    });
  };

  render() {
    if (this.state.isFinished == false) {
      return (
        <React.Fragment>
          <div className="container pt-5">
            <h1>영화 리뷰</h1>
          </div>
          <div className="" style={{ height: '660px' }} />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <div className="container pt-5">
          <h1>영화 리뷰</h1>

          <div className="d-flex justify-content-end">
            조회수: {this.state.review.views}
          </div>

          <hr />
          <div className="container">
            <div className="App">
              <ReadImageEditor
                editorState={this.state.editorState}
                readOnly={true}
              />
            </div>
          </div>

          <hr />
          <div className="d-flex justify-content-end">
            {auth.getCurrentUser() &&
              this.state.review.userId === auth.getCurrentUser()._id && (
                <div>
                  <button
                    onClick={() => this.handleClick()}
                    className="btn btn-primary mr-2"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => this.handleDelete()}
                    className="btn btn-danger mr-2"
                  >
                    삭제
                  </button>
                </div>
              )}
            작성자: {this.state.review.userName} <br />
            작성일:
            {moment(this.state.review.publishDate).format('YYYY-MM-D')}
          </div>
        </div>
        <div className="" style={{ height: '400px' }} />

        <PopupModal
          isShow={this.state.isShowPopup}
          msg={this.state.popupMessage}
          handleClose={this.handlePopupCallback}
        />

        <ConfirmModal
          isShow={this.state.isShowConfirmPopup}
          message={this.state.popupConfirmMessage}
          onResponse={this.handleConfirmPopupCallback}
        />
      </React.Fragment>
    );
  }
}

export default Review;
