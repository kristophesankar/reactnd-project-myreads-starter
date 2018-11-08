import React from "react";

//Book Component
const Book = props => {
    // Pass book and an update method to component via props
    const { book, onUpdate } = props;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${
                  // check if imagelinks exits first to prevent error
                  book.hasOwnProperty("imageLinks")
                    ? book.imageLinks.thumbnail
                    : "https://dummyimage.com/128x193/2e7c31/fff.png&text=Cover+Missing"
                }")`
              }}
            />
            {/* Shelf Changer control. Get the value and book shelf. */}
            <div className="book-shelf-changer">
              <select
                value={book.shelf}
                onChange={e => {
                  book.shelf = e.target.value;
                  onUpdate(book);
                }}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {/* Dusplay each author on new line. */}
          {book.hasOwnProperty("authors") &&
            book.authors.map(author => (
              <div key={`${book.id}_${author}`} className="book-authors">
                {author}
              </div>
            ))}
        </div>
      </li>
    );
  
}

export default Book;
