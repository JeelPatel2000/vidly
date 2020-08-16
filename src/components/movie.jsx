import React, { Component } from "react";

class Movie extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Movie: {this.props.match.params.id}</h1>
        <button
          className="btn btn-primary"
          onClick={() => this.props.history.push("/movies")}
        >
          Save
        </button>
      </React.Fragment>
    );
  }
}

export default Movie;
