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

  //get the book control state
  getBookState = (book, books) => {
    
    let returnObject = {}
    //if book is in array of all books then set the book in array as search result
    if(books.some(b => book.id === b.id)){
      returnObject = books.filter(item => book.id === item.id)[0]
    }else{
      //else set control to none and return the book
      book['shelf'] = 'none';
      returnObject = book;
    }
    return returnObject;
  }

  render() {
    const { query, results } = this.state;
    const { books, onUpdateBookshelf } = this.props;

    //Carry out search
    const visibleBooks =
      query === "" && results.error === "empty query"
        ? //clear screen if there are no results
          []
        : results.map(book => {
            //return books that pass  the search requirement
            
            return (
              //if book  matches query return true
              this.getBookState(book, books)
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
