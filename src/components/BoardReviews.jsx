import React, { Component } from 'react';
import BoardReviewsTable from './BoardReviewsTable';

class BoardReviews extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container pt-5">
          <h1>게시판</h1>
          <hr />

          <BoardReviewsTable
            page={this.props.match.params.page}
            search={this.props.match.params.search}
          />
        </div>
        <div className="" style={{ height: '500px' }} />
      </React.Fragment>
    );
  }
}

export default BoardReviews;
