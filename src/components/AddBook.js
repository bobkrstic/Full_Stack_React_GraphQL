import React, { Component } from "react";
// import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import * as compose from "lodash.flowright";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../queries/queries";

class AddBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      genre: "",
      authorId: ""
    };
  }

  displayAuthors() {
    // getAuthorsQuery here comes from the bottom of the file
    // name: getAuthorsQuery (we have two queries so this.props.data will not work)
    var data = this.props.getAuthorsQuery;
    // console.log(this.props);

    if (data.loading) {
      return <option disabled>Loading Authors...</option>;
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }

  submitForm(e) {
    e.preventDefault();
    // console.log(this.state);
    // same thing addBookMutaton comes from the bottom of the file
    // name: addBookMutation
    // here finally we can use props which is the mutation
    // and passing variables to our mutation so that it can be sent to the database
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      // to reload and rerender the component
      refetchQueries: [{ query: getBooksQuery }]
    });
  }

  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Book Name:</label>
          <input
            type="text"
            onChange={e => this.setState({ name: e.target.value })}
          />
          {/* {console.log(this.state.name)} */}
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            onChange={e => this.setState({ genre: e.target.value })}
          />
          {/* {console.log(this.state.genre)} */}
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={e => this.setState({ authorId: e.target.value })}>
            <option>Select author</option>
            {this.displayAuthors()}
            {/* {console.log(this.state.authorId)} */}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

// here we are binding our query to this component
// 'compose' is needed to export all queries and mutations at once
// this is the way to bind multiple queries to one component
export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);

// export default graphql(getAuthorsQuery)(AddBook);
