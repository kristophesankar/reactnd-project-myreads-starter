import React, { Component } from "react";
import Book from "./Book";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

class SearchBar extends Component {
  state = {
    query: "",
    results: []
  };

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

    let visibleBooks = [];
    if (query === "" && results.error === "empty query") {
      visibleBooks = [];
    } else {
      visibleBooks = results.filter(book => {

        return book.title.toLowerCase().includes(query.toLowerCase()) 

      });


    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={e => this.fetchOnChangeSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
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
