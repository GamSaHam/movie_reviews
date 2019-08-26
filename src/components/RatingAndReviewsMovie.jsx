import React, { Component } from 'react';

import { getTopMovies } from '../services/movieService';
import { getReviewsByMovieId } from '../services/reviewService';
import MovieCard from './MovieCard';
import './RatingAndReviewsMovie.scss';

class RatingAndReviewsMovie extends Component {
  state = {
    movies: [],
    collapseIndex: 1,
    reviews: []
  };

  async componentDidMount() {
    await this.populateTopMovies();
  }

  async populateTopMovies() {
    try {
      const { data: movies } = await getTopMovies();

      this.setState({ movies });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        // this.props.history.replace('/not-found');
      }
    }
  }

  handleCollapse = obj => {
    this.setState({ collapseIndex: obj.clickIndex });
  };

  renderMovieCard = () => {
    let clickIndexCnt = 1;

    let movie_card = [];

    for (let i = 0; i < 4; i++) {
      let movie = this.state.movies[i];

      if (movie) {
        movie_card.push(
          <MovieCard
            onClick={this.handleCollapse}
            collapseIndex={this.state.collapseIndex}
            clickIndex={clickIndexCnt}
            movie={movie}
            isOpen={i === 0 ? true : false}
          />
        );
      }
      clickIndexCnt++;
    }

    return movie_card;
  };

  render() {
    return (
      <div className="container">
        <h1>평점 & 리뷰</h1>

        <div className="row">
          <div className="accordion col-8 " id="accordionExample">
            {this.renderMovieCard()}
          </div>
          <div className="col-4 d-flex flex-column bd-highlight mb-3">
            <h2>스포트 라이트</h2>
            <img
              src={'/img/popcorn.jpg'}
              alt=""
              className="img-fluid clickable"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default RatingAndReviewsMovie;
