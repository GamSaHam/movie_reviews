import React, { Component } from 'react';

class Start extends Component {
  state = {};

  renderStar = total => {
    let star = [];

    let val = total;

    for (let i = 1; i <= 5; i++) {
      if (val >= 1) {
        star.push(<i className="fa fa-star text-warning" />);
      } else if (val <= 0) {
        star.push(<i className="far fa-star text-warning" />);
      } else {
        star.push(<i className="fas fa-star-half-alt text-warning" />);
      }

      val = val - 1;
    }

    return star;
  };

  render() {
    const { rating } = this.props;

    return <div>{this.renderStar(rating)}</div>;
  }
}

export default Start;
