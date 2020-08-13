import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres, genres } from "../services/fakeGenreService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import pagination from "../utils/pagination";
import ListGroup from "./common/ListGroup";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 2,
    currentPage: 1,
    genres: getGenres(),
    currentGenre: null,
  };

  handleDelete = (movie) => {
    let movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies }, this.onDeletePageChangeHandler);
  };

  //callback function, changes page automatically when there are no items on the page
  onDeletePageChangeHandler = () => {
    const { currentPage, pageSize, movies, currentGenre } = this.state;

    //filtering the currently displayed movies
    const movies_curently_displayed = currentGenre
      ? movies.filter((m) => m.genre._id === currentGenre._id)
      : movies;

    if ((currentPage - 1) * pageSize === movies_curently_displayed.length) {
      this.handlePageChange(currentPage - 1);
    }
  };

  handleLike = (movie) => {
    // console.log("Like clicked", movie);
    let movies = [...this.state.movies];
    let index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = (genre) => {
    this.setState({ currentGenre: genre }, this.handlePageChange(1));
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies } = this.state;
    const { genres, currentGenre } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const filterd = currentGenre
      ? allMovies.filter((m) => m.genre._id === currentGenre._id)
      : allMovies;
    const movies = pagination(filterd, pageSize, currentPage);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            list={genres}
            selectedItem={currentGenre}
            onItemSelect={this.handleGenreChange}
          />
        </div>
        <div className="col">
          <p>There are {filterd.length} movies in the database.</p>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Genre</th>
                <th>Number in stock</th>
                <th>Daily rental rate</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            pageSize={pageSize}
            itemsCount={filterd.length}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
