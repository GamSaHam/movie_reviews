import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getBestReviews } from '../services/reviewService';
import moment from 'moment';
class BestReviewsTable extends Component {
  state = {
    column: ['번호', '영화', '제목', '작성자', '조회수'],
    reviews: []
  };

  async bestReview() {
    try {
      const { data: reviews } = await getBestReviews();

      this.setState({ reviews });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        console.log('error handling');
      }
      //this.props.history.replace('/not-found');
    }
  }

  async componentDidMount() {
    await this.bestReview();
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            {this.state.column.map(value => (
              <th scope="col" className="text-center">
                {value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.state.reviews.map((currentElement, index) => (
            <React.Fragment>
              <tr>
                <td className="text-center" style={{ width: '10%' }}>
                  {index + 1}
                </td>

                <td className="text-center" style={{ width: '10%' }}>
                  {currentElement.movie.name}
                </td>
                <td className="text-center" style={{ width: '60%' }}>
                  <Link to={'/review/' + currentElement._id}>
                    {currentElement.title}
                  </Link>
                </td>
                <td className="text-center" style={{ width: '10%' }}>
                  {currentElement.userName}
                </td>
                <td className="text-center" style={{ width: '10%' }}>
                  {currentElement.views}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    );
  }
}

export default BestReviewsTable;
