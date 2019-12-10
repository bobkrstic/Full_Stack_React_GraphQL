import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";

class BookDetails extends Component {
  displayBookDetails() {
    const { book } = this.props.data;

    if (book) {
      return (
        <div>
          <h2 style={{ textDecoration: "underline" }}>{book.name}</h2>
          <p>
            <span style={{ fontWeight: "bold" }}>Book genre:</span> {book.genre}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Book author:</span>{" "}
            {book.author.name}
          </p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {book.author.books.map(item => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected</div>;
    }
  }

  render() {
    // props are passed from the BookDetails component and will be the book.id
    // console.log(this.props);
    return <div id="book-details">{this.displayBookDetails()}</div>;
  }
}

// here we are binding our query to this component
// (name of the query)(name of the component)
// also need to pass props which is book.id
export default graphql(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookId
      }
    };
  }
})(BookDetails);
