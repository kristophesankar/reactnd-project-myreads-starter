import React from "react";
import SearchBar from "./SearchBar";
import Bookshelf from "./Bookshelf";
import * as BooksAPI from "./BooksAPI";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";

import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books
      }));
    });
  }

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
                  <Bookshelf
                    books={this.state.books}
                    bookshelfTitle="Currently Reading"
                    shelf="currentlyReading"
                    onUpdateBookshelf={this.updateBookshelf}
                  />
                  <Bookshelf
                    books={this.state.books}
                    bookshelfTitle="Want To Read"
                    shelf="wantToRead"
                    onUpdateBookshelf={this.updateBookshelf}
                  />
                  <Bookshelf
                    books={this.state.books}
                    bookshelfTitle="Read"
                    shelf="read"
                    onUpdateBookshelf={this.updateBookshelf}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
