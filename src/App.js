import React from "react";
import "./App.css";
import Movies from "./components/movies";
import Movie from "./components/movie";
import Navbar from "./components/Navbar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import { Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <main className="container">
        <Switch>
          <Route path="/movies/:id" component={Movie} />
          <Route path="/movies" component={Movies} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/customers" component={Customers} />
          <Route path="/notfound" component={NotFound} />
          <Redirect from="/" to="/movies" exact />
          <Redirect to="/notfound" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
