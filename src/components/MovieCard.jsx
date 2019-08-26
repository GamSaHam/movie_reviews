import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getReviewsByMovieId } from '../services/reviewService';
import Star from './common/Star';
class MovieCard extends Component {
  state = {
    reviews: []
  };

  async componentDidMount() {
    await this.populateReviews();
  }

  async populateReviews() {
    try {
      const { data: reviews } = await getReviewsByMovieId(this.props.movie._id);

      this.setState({ reviews });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        // this.props.history.replace('/not-found');
      }
    }
  }

  renderReviews = () => {
    let tag = [];

    for (let i = 0; i < this.state.reviews.length; i++) {
      let review = this.state.reviews[i];
      tag.push(
        <Link to={'/review/' + review._id} className="row pt-1">
          {review.title + '   (' + review.views + ')'}
        </Link>
      );
    }

    return tag;
  };

  render() {
    const { collapseIndex, onClick, clickIndex, isOpen, movie } = this.props;

    return (
      <div className="card border-right-0 border-left-0">
        <div
          className={
            collapseIndex === clickIndex ? 'card-header d-none' : 'card-header'
          }
          id={'heading' + clickIndex}
        >
          <h2 className="mb-0">
            <button
              className="btn btn-link"
              type="button"
              data-toggle="collapse"
              data-target={'#collapse' + clickIndex}
              aria-expanded="true"
              aria-controls={'collapse' + clickIndex}
              onClick={() => onClick({ clickIndex })}
            >
              <span>{movie.name}</span>
            </button>
          </h2>
        </div>

        <div
          id={'collapse' + clickIndex}
          className={
            isOpen === true
              ? 'collapse no-transition show'
              : 'collapse no-transition'
          }
          aria-labelledby={'heading' + clickIndex}
          data-parent="#accordionExample"
        >
          <div className="card-body">
            <div className="row">
              <div className="col-3 ">
                <img
                  src={'/img/' + movie.image_path}
                  alt=""
                  className="img-fluid "
                />
              </div>
              <div className="col-9 ">
                <div className="row p-1">
                  <Star
                    className="mt-5 bg-dark"
                    rating={movie.total === null ? 0 : movie.total.toFixed(1)}
                  />

                  <span className="text-warning">
                    {movie.total === null ? '0.0' : movie.total.toFixed(1)}/5.0
                  </span>
                </div>

                {this.renderReviews()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCard;
