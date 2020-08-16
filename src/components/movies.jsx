import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import pagination from "../utils/pagination";
import ListGroup from "./common/ListGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
    genres: getGenres(),
    currentGenre: null,
    sortColumn: {
      path: "title",
      order: "asc",
    },
  };

  componentDidMount() {
    const movies = getMovies();
    const genres = [{ _id: "", name: "All Genre" }, ...getGenres()];
    this.setState({ movies, genres });
  }

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
    this.setState({ currentGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData(currentGenre, allMovies, sortColumn, pageSize, currentPage) {
    const filterd =
      currentGenre && currentGenre._id
        ? allMovies.filter((m) => m.genre._id === currentGenre._id)
        : allMovies;

    const sorted = _.orderBy(filterd, [sortColumn.path], [sortColumn.order]);
    const movies = pagination(sorted, pageSize, currentPage);
    return { filterd, movies };
  }

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies } = this.state;
    const { genres, currentGenre, sortColumn } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const { filterd, movies } = this.getPagedData(
      currentGenre,
      allMovies,
      sortColumn,
      pageSize,
      currentPage
    );

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
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
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
