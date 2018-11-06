import React, { Component } from "react";
import Book from "./Book";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

//Search component
class SearchBar extends Component {
  state = {
    query: "",
    results: []
  };

  //function that fetches results from search api and updates state
  fetchOnChangeSearch = query => {
    BooksAPI.search(query).then(books => {
      if (Array.isArray(books)) {
        this.setState(currentState => ({
          results: books
        }));
      }
      if (query === "") {
        this.setState(currentState => ({
          results: []
        }));
      }
    });

    this.setState(currentState => ({
      query: query
    }));
  };

  render() {
    const { query, results } = this.state;
    const { onUpdateBookshelf } = this.props;

    //Carry out search
    const visibleBooks =
      query === "" && results.error === "empty query"
        ? //clear scheen if there are no results
          []
        : results.filter(book => {
            //return books that pass  the search requirement
            return (
              //if book title mathes query return true
              book.title.toLowerCase().includes(query.toLowerCase()) ||
              //if book has prop authors then join values and check if query exixts in it
              (book.hasOwnProperty("authors") &&
                book.authors
                  .join(" ")
                  .toLowerCase()
                  .includes(query.toLowerCase()))
            );
          });

    return (
      <div className="search-books">
        <div className="search-books-bar">
          {/* Link to close the search component*/}
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              //onChange fetch results from search api
              onChange={e => this.fetchOnChangeSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {/* Only show books filtered by search */}
            {visibleBooks.map(book => (
              <Book
                key={book.id}
                book={book}
                onUpdate={b => {
                  onUpdateBookshelf(b);
                }}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBar;
