import React from "react";

class SearchBar extends React.Component {
  state = { term: "" };

  onFormSubmit = (e) => {
    e.preventDefault();

    this.props.onSubmit(this.state.term);
  };
  render() {
    return (
      <div className="ui segment">
        <form action="" className="ui form" onSubmit={this.onFormSubmit}>
          <label htmlFor="imagesearch">image search</label>
          <input
            className="field"
            type="text"
            name="term"
            id=""
            value={this.state.term}
            onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
          />
        </form>
      </div>
    );
  }
}

export default SearchBar;
