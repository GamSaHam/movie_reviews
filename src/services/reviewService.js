import http from './httpService';

const apiEndpoint = '/reviews';

function reviewUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getReviews() {
  return http.get(apiEndpoint);
}

export function getSearchReview(search, category, page) {
  var body = {};
  body.search = search;
  body.category = category;
  body.page = page;

  return http.post(apiEndpoint + '/search', body);
}

export function getRecentReviews() {
  return http.get(apiEndpoint + '/recent');
}

export function getBestReviews() {
  return http.get(apiEndpoint + '/best');
}

export function getReview(reviewId) {
  return http.get(reviewUrl(reviewId));
}

export function saveReview(review) {
  if (review._id) {
    const body = { ...review };
    delete body._id;
    return http.put(reviewUrl(review._id), body);
  }
  console.log(review);

  return http.post(apiEndpoint, review);
}

export function deleteReview(reviewId) {
  return http.delete(reviewUrl(reviewId));
}

export function getReviewsByMovieId(id) {
  return http.get(apiEndpoint + '/movies/' + id);
}
