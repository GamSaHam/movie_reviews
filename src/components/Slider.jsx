import React, { Component } from 'react';

import history from '../history';

import {
  getBestMovies,
  getBestViewsMovies,
  getBestRecentMovies
} from '../services/movieService';

import Star from './common/Star';
import './Slider.scss';

class Slider extends Component {
  state = {
    bestRatingMovies: [],
    bestViewsMovies: [],
    bestRecentMovies: []
  };

  // 영화 등록시 이름 , 이미지 경로
  async componentDidMount() {
    await this.mondlyBestMovies();
    await this.mondlyBestViewsMovie();
    await this.mondlyBestRecentMovie();
  }

  async mondlyBestMovies() {
    try {
      const { data: bestRatingMovies } = await getBestMovies();

      this.setState({ bestRatingMovies });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        // this.props.history.replace('/not-found');
      }
    }
  }

  async mondlyBestViewsMovie() {
    try {
      const { data: bestViewsMovies } = await getBestViewsMovies();

      this.setState({ bestViewsMovies });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        // this.props.history.replace('/not-found');
      }
    }
  }

  async mondlyBestRecentMovie() {
    try {
      const { data: bestRecentMovies } = await getBestRecentMovies();

      this.setState({ bestRecentMovies });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        // this.props.history.replace('/not-found');
      }
    }
  }

  handleImageClick = movie => {
    history.push('/board_reviews/new/' + movie.name);
  };

  renderMovieCard = movie => {
    if (movie) {
      return (
        <div className="col pr-1 pl-1">
          <div className="card bg-dark" style={{ height: '300px' }}>
            <img
              src={'/img/' + movie.image_path}
              alt=""
              className={movie ? 'img-fluid clickable' : 'img-fluid bg-dark'}
              style={{ height: '270px' }}
              onClick={() => {
                this.handleImageClick(movie);
              }}
            />
            <div className="card-body pt-1">
              <div className="row">
                <Star
                  rating={movie.total === null ? 0 : movie.total.toFixed(1)}
                />

                <span className="ml-1 text-warning">
                  {movie.total === null ? '0.0' : movie.total.toFixed(1)}/5.0
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="col pr-1 pl-1">
        <div className="card bg-dark" style={{ height: '300px' }}>
          <div className={'bg-dark'} style={{ height: '270px' }} />
        </div>
      </div>
    );
  };

  renderCarouselItem = movies => {
    let card = [];

    for (let i = 0; i < 5; i++) {
      let movie = movies[i];

      card.push(this.renderMovieCard(movie));
    }

    let card2 = [];

    for (let i = 5; i < 10; i++) {
      let movie = movies[i];

      card2.push(this.renderMovieCard(movie));
    }

    return (
      <React.Fragment>
        <div className="row mr-4 ml-4">{card}</div>

        <div className="row mr-4 ml-4 pt-4">{card2}</div>
      </React.Fragment>
    );
  };

  render() {
    return (
      <div className="container pt-5 pb-5  ">
        <h1>이달의 영화랭킹</h1>
        <hr />
        <div className="pt-5 pb-5 slider-bg">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
            data-interval="false"
          >
            <ol className="carousel-indicators mb-0 pb-0">
              <button
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                className="btn btn-primary active mr-1"
              >
                평점
              </button>
              <button
                data-target="#carouselExampleIndicators"
                data-slide-to="1"
                className="btn btn-primary  mr-1"
              >
                조회수
              </button>
              <button
                data-target="#carouselExampleIndicators"
                data-slide-to="2"
                className="btn btn-primary  mr-1"
              >
                최신순
              </button>
            </ol>
            <div className="carousel-inner">
              <div
                className="carousel-item active pl-5 pr-5"
                style={{ width: '100%', height: '670px' }}
              >
                {this.renderCarouselItem(this.state.bestRatingMovies)}
              </div>

              <div
                className="carousel-item pl-5 pr-5"
                style={{ width: '100%', height: '670px' }}
              >
                {this.renderCarouselItem(this.state.bestViewsMovies)}
              </div>
              <div
                className="carousel-item pl-5 pr-5"
                style={{ width: '100%', height: '670px' }}
              >
                {this.renderCarouselItem(this.state.bestRecentMovies)}
              </div>
            </div>

            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Slider;
