import React, { Component } from 'react';
import Joi from 'joi-browser';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { getReview, saveReview } from '../services/reviewService';
import { getMovies } from '../services/movieService';
import auth from '../services/authService';
import Form from '../components/common/form';
import RichEditor from './common/RichEditor';
import PopupModal from './modal/PopupModal';
import CustomImageEditor from './CustomImageEditor';

class Write extends Form {
  state = {
    data: {
      movieId: '',
      title: '',
      rating: '',
      content: {},
      userId: '',
      userName: '',
      views: ''
    },
    editorState: '',
    movies: [],
    errors: {},
    isShowPopup: false,
    popupMessage: '',
    id: ''
  };

  constructor(props) {
    super(props);
    this.state.editorState = EditorState.createEmpty();
    this.state.data.views = 0;
  }

  schema = {
    _id: Joi.string(),
    movieId: Joi.string()
      .required()
      .label('Movie'),
    title: Joi.string()
      .required()
      .min(5)
      .max(50)
      .label('Title'),
    rating: Joi.number()
      .min(0)
      .max(5)
      .required()
      .label('Rating'),
    content: Joi.object(),
    userId: Joi.string(),
    userName: Joi.string(),
    views: Joi.number()
  };

  async populateMovies() {
    const { data: movies } = await getMovies();
    this.setState({ movies });
  }

  async populateReview() {
    try {
      const reviewId = this.props.match.params.id;

      if (reviewId === 'new') return;

      const { data: review } = await getReview(reviewId);

      const content = review.content;
      if (content) {
        this.state.editorState = EditorState.createWithContent(
          convertFromRaw(JSON.parse(content))
        );
      }

      this.setState({ data: this.mapToViewModel(review) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace('/not-found');
    }
  }

  async componentDidMount() {
    await this.populateMovies();
    await this.populateReview();

    this.state.data.userId = auth.getCurrentUser()._id;
    this.state.data.userName = auth.getCurrentUser().name;
  }

  mapToViewModel(review) {
    return {
      _id: review._id,
      movieId: review.movie._id,
      title: review.title,
      rating: review.rating,
      content: review.content,
      userId: review.userId,
      userName: review.userName,
      views: review.views
    };
  }

  doSubmit = async () => {
    const contentState = this.state.editorState.getCurrentContent();
    this.state.data.content = JSON.stringify(convertToRaw(contentState));

    let ret = await saveReview(this.state.data);

    this.setState({
      isShowPopup: true,
      popupMessage: '저장되었습니다.',
      id: ret.data._id
    });

    // 불러오기
    //
  };
  handleOnChange = editorState => {
    this.setState({ editorState });
  };

  handlePopupCallback = () => {
    this.setState({ isShowPopup: false });

    window.location.href = '/write/' + this.state.id;
  };

  render() {
    return (
      <React.Fragment>
        <div className="container pt-5">
          <h1 className="">리뷰작성하기</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderSelect('movieId', 'Movie', this.state.movies)}
            {this.renderInput('title', 'Title')}
            {this.renderInput('rating', 'Rating')}

            <CustomImageEditor
              editorState={this.state.editorState}
              handleOnChange={this.handleOnChange}
            />

            <hr />
            <div className="d-flex justify-content-end mr-3">
              {this.renderButton('Save')}
            </div>
          </form>
        </div>
        <div className="" style={{ height: '400px' }} />

        <PopupModal
          isShow={this.state.isShowPopup}
          msg={this.state.popupMessage}
          handleClose={() => this.handlePopupCallback()}
        />
      </React.Fragment>
    );
  }
}

export default Write;
