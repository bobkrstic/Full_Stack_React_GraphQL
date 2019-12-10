import React, { Component } from "react";
// import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";

// components
import BookDetails from "./BookDetails";

class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null
    };
  }

  displayBooks() {
    var data = this.props.data;
    if (data.loading) {
      return <div>Lodading books...</div>;
    } else {
      // uncomment console.log(this.props)
      // when loading is false, it means that the data is returned
      return data.books.map(book => {
        return (
          <li
            key={book.id}
            onClick={e => {
              this.setState({ selected: book.id });
            }}
          >
            {book.name}
          </li>
        );
      });
    }
  }

  render() {
    // console.log(this.props);
    return (
      <div>
        <ul id="book-list">{this.displayBooks()}</ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

// binding the query to the component
// once the data is returned as a response to the query
// it is stored in the props of this component (this.props)
export default graphql(getBooksQuery)(BookList);
