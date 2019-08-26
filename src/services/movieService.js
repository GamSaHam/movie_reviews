import http from './httpService';

export function getMovies() {
  return http.get('/movies');
}

export function getBestMovies() {
  return http.get('/movies/best');
}

export function getBestViewsMovies() {
  return http.get('/movies/best_views');
}

export function getBestRecentMovies() {
  return http.get('/movies/best_recent');
}

export function getTopMovies() {
  return http.get('/movies/top');
}
