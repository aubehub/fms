import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import './Home.css';

class Home extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      movies: [],
      searchEntered: false,
    };
    this.searchSummary = this.searchSummary.bind(this);
  }

  searchSummary(title) {
    this.props.history.push(`/search/${title}`);
  }

  render(){
    return (
      <>
      {!this.state.searchEntered && (
        <div className="body-wrap homepage">
          <div className="search-div">
            <div className="shelf-img-div">
              <div className="shelf-img">
                <h1>Favorite Movie shelf</h1>
              </div>
            </div>
            <SearchBar searchSummary={this.searchSummary} size="small"/>
          </div>

            <div className="pic">
              <img className="camera" src="./camera.jpg" alt="pic" />
            </div>
        </div>
      )}
      </>
    )
  }
}
  
export default Home;