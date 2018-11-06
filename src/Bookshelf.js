import React, { Component } from "react";
import Book from "./Book";

//Bookshelf component
class Bookshelf extends Component {
  render() {
    // Pass books and an update method to component via props
    const { books, onUpdateBookshelf, shelf } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.bookshelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {/* Show only books that equals the shelf passed via props */}
            {books
              .filter(b => {
                return b.shelf === shelf;
              })
              .map(book => (
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

export default Bookshelf;
