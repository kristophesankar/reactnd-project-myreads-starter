import React from "react";
import SearchBar from "./SearchBar";
import NoMatch from "./NoMatch";
import Bookshelf from "./Bookshelf";
import * as BooksAPI from "./BooksAPI";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { Switch } from "react-router-dom";

import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  //get all books to show on bookshelves
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books
      }));
    });
  }

  //updates a book state with a new bookshef value
  updateBookshelf = book => {
    BooksAPI.update(book, book.shelf).then(books => {
      const newBooks = this.state.books.filter(function(b) {
        return b.id !== book.id;
      });
      this.setState(currentState => ({
        books: [...newBooks, book]
      }));
    });
  };

  render() {
    return (
      <div className="app">
        {/* Route to Search Page */}
        <Switch>
          <Route
            exact
            path="/search"
            render={() => (
              <SearchBar
                books={this.state.books}
                onUpdateBookshelf={this.updateBookshelf}
              />
            )}
          />
          {/* Route to Bookshelf Page */}
          <Route
            exact
            path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    {/* The Currently Reading Component */}
                    <Bookshelf
                      books={this.state.books}
                      bookshelfTitle="Currently Reading"
                      shelf="currentlyReading"
                      onUpdateBookshelf={this.updateBookshelf}
                    />
                    {/* The Want To Read Component */}
                    <Bookshelf
                      books={this.state.books}
                      bookshelfTitle="Want To Read"
                      shelf="wantToRead"
                      onUpdateBookshelf={this.updateBookshelf}
                    />
                    {/* The Read Component */}
                    <Bookshelf
                      books={this.state.books}
                      bookshelfTitle="Read"
                      shelf="read"
                      onUpdateBookshelf={this.updateBookshelf}
                    />
                  </div>
                </div>
                <div className="open-search">
                  {/* Link to navigate user to search page */}
                  <Link to="/search">Add a book</Link>
                </div>
              </div>
            )}
          />
        {/* 404 Page */}
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
