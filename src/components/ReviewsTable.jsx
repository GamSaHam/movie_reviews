import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getRecentReviews } from '../services/reviewService';
import moment from 'moment';
class ReviewsTable extends Component {
  state = {
    column: ['번호', '영화', '제목', '작성자', '등록일'],
    reviews: []
  };

  async recentReview() {
    try {
      const { data: reviews } = await getRecentReviews();

      this.setState({ reviews });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        console.log('error handling');
      }
      //this.props.history.replace('/not-found');
    }
  }

  async componentDidMount() {
    await this.recentReview();
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="text-center">
              번호
            </th>
            <th scope="col" className="text-center d-none d-lg-table-cell">
              영화
            </th>
            <th scope="col" className="text-center">
              제목
            </th>
            <th scope="col" className="text-center d-none d-lg-table-cell">
              작성자
            </th>
            <th scope="col" className="text-center">
              등록일
            </th>
          </tr>
        </thead>
        <tbody>
          {this.state.reviews.map((currentElement, index) => (
            <React.Fragment>
              <tr>
                <td className="text-center" style={{ width: '10%' }}>
                  {index + 1}
                </td>
                <div className="d-none d-lg-block">
                  <td className="text-center" style={{ width: '15%' }}>
                    {currentElement.movie.name}
                  </td>
                </div>
                <td className="text-center" style={{ width: '55%' }}>
                  <Link to={'/review/' + currentElement._id}>
                    {currentElement.title}
                  </Link>
                </td>
                <div className="d-none d-lg-block">
                  <td className="text-center" style={{ width: '10%' }}>
                    {currentElement.userName}
                  </td>
                </div>
                <td className="text-center" style={{ width: '10%' }}>
                  {moment(currentElement.publishDate).format('YYYY-MM-D')}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    );
  }
}

export default ReviewsTable;
