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
    currentGenre: "Action",
  };

  handleDelete = (movie) => {
    let movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies }, () => this.onDeletePageChange());
  };

  onDeletePageChange = () => {
    const { currentPage, pageSize, movies } = this.state;
    if ((currentPage - 1) * pageSize === movies.length) {
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
    this.setState({ currentGenre: genre });
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies } = this.state;
    const { genres, currentGenre } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    var moviesByGenres = movies.filter((m) => m.genre.name === currentGenre);
    const allMovies = pagination(moviesByGenres, pageSize, currentPage);
    console.log(allMovies);

    return (
      <React.Fragment>
        <p>There are {count} movies in the database.</p>
        <div className="row">
          <div className="col-2">
            <ListGroup
              list={genres.map((g) => g.name)}
              selectedItem={currentGenre}
              onClick={this.handleGenreChange}
            />
          </div>
          <div className="col">
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
                {allMovies.map((movie) => (
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
              itemsCount={moviesByGenres.length}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
