import React, { Component } from 'react';
import { getReviews, getSearchReview } from '../services/reviewService';
import moment from 'moment';
import Pagination from './common/pagination';
import { Link } from 'react-router-dom';

class BoardReviewsTable extends Component {
  state = {
    column: ['번호', '영화', '제목', '작성자', '등록일', '조회수'],
    reviews: [],
    currentReviews: [],
    page: 1,
    pageSize: 10,
    search: '',
    category: 'name',
    selectPageSize: ''
  };

  componentWillMount() {
    if (this.props.page != 'new') {
      this.state.page = parseInt(this.props.page);
    }
    if (localStorage.getItem('page')) {
      this.state.page = localStorage.getItem('page');
    }

    if (localStorage.getItem('pageSize')) {
      this.state.pageSize = localStorage.getItem('pageSize');

      this.setState({ selectPageSize: 'v' + localStorage.getItem('pageSize') });
    }
  }

  pagingReviews = () => {
    const { page, pageSize, reviews } = this.state;

    var currentReviews = [];

    let cnt = 0;
    for (
      let i = (page - 1) * pageSize;
      i < page * pageSize && i < reviews.length && cnt < pageSize;
      i++
    ) {
      currentReviews.push(reviews[i]);
      cnt++;
    }

    this.setState({ currentReviews });
  };

  async recentReview() {
    try {
      const { data: reviews } = await getReviews();

      this.setState({ reviews });
      this.pagingReviews();
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        console.log('error handling');
      }
      //this.props.history.replace('/not-found');
    }
  }

  async componentDidMount() {
    await this.recentReview();

    if (this.props.search) {
      this.state.search = this.props.search;
      this.populateSearchReview();
    }
  }

  async populateSearchReview() {
    try {
      const { data: reviews } = await getSearchReview(
        this.state.search,
        this.state.category,
        this.state.page
      );

      this.setState({ reviews });
      this.pagingReviews();
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        console.log('error handling');
      }
      //this.props.history.replace('/not-found');
    }
  }

  handleChange = event => {
    this.setState({ search: event.target.value });
  };

  handleSelectChange = event => {
    this.setState({ category: event.target.value });
  };

  handlePageSelectChange = event => {
    let val = event.target.value.substring(1, 3);
    this.state.pageSize = val;
    localStorage.setItem('pageSize', val);
    this.setState({ pageSize: val });

    this.setState({ selectPageSize: event.target.value });

    this.pagingReviews();
  };

  handleSubmit = e => {
    e.preventDefault();

    this.populateSearchReview();

    // 검색해서 다시 가지고 온다.
  };

  handlePagination = page => {
    localStorage.setItem('page', page);

    this.state.page = page;
    this.setState({ page: page });
    this.pagingReviews();
  };

  render() {
    return (
      <React.Fragment>
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
            {this.state.currentReviews.map((currentElement, index) => (
              <React.Fragment>
                <tr>
                  <td className="text-center" style={{ width: '10%' }}>
                    {index + 1}
                  </td>

                  <td className="text-center" style={{ width: '10%' }}>
                    {currentElement.movie.name}
                  </td>
                  <td className="text-center" style={{ width: '50%' }}>
                    <Link to={'/review/' + currentElement._id}>
                      {currentElement.title}
                    </Link>
                  </td>
                  <td className="text-center" style={{ width: '10%' }}>
                    {currentElement.userName}
                  </td>
                  <td className="text-center" style={{ width: '10%' }}>
                    {moment(currentElement.publishDate).format('YYYY-MM-D')}
                  </td>
                  <td className="text-center" style={{ width: '10%' }}>
                    {currentElement.views}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>

        <div className="mt-1 row">
          <div className="col-4">
            <form
              className="form-inline my-2 my-lg-0"
              onSubmit={this.handleSubmit}
            >
              <select
                className="form-control"
                onChange={this.handleSelectChange}
                style={{ width: '30%' }}
                value={this.state.category}
              >
                <option value="name">영화이름</option>
                <option value="title">글제목</option>
                <option value="writer">작성자</option>
              </select>
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="검색"
                aria-label="검색"
                style={{ width: '40%' }}
                value={this.state.search}
                onChange={this.handleChange}
              />
              <button
                className="btn btn-outline-primary my-2 my-sm-0"
                type="submit"
              >
                검색
              </button>
            </form>
          </div>
          <div className="col-5">
            <Pagination
              page={this.state.page}
              pageSize={this.state.pageSize}
              contentSize={this.state.reviews.length}
              onClick={this.handlePagination}
            />
          </div>
          <div className="col-3">
            <div className="row">
              글갯수:
              <select
                className="form-control"
                onChange={this.handlePageSelectChange}
                style={{ width: '40%' }}
                value={this.state.selectPageSize}
              >
                <option value="v10">10</option>
                <option value="v20">20</option>
                <option value="v30">30</option>
                <option value="v50">50</option>
              </select>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BoardReviewsTable;
