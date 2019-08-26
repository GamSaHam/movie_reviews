import React, { Component } from 'react';
import Header from './Header';
import Slider from './Slider';
import RatingAndReviewsMovie from './RatingAndReviewsMovie';
/*
<button
          onClick={() => {
            this.props.history.push('/reviews');
          }}
        ></button>
        */
class Home extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Slider />
        <RatingAndReviewsMovie />
        <div className="" style={{ height: '400px' }} />
      </React.Fragment>
    );
  }
}

export default Home;
