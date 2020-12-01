import React from 'react';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      title: "",
    };
  }

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value
    })
  }

  handleSearch = (ev) => {
    ev.preventDefault();
    this.props.history.push(`/search/${this.state.title}`);
  }

  render(){
    return (
      <Form inline className="form" onSubmit={this.handleSearch}>
        <FormControl type="text" placeholder="Search movie" className="search-bar" onChange={this.handleTitleChange} />
      </Form>
    )
  }
}

export default withRouter(SearchBar);