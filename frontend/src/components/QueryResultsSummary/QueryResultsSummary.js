import React from 'react';

/*
let genres;
getGenres().then(res => genres = res.genres);
*/

class QueryResultsSummary extends React.Component {

  render(){

    return (
    <div className="movie-sum-wrap">
      <div className="image-sum-container">
        <img src={this.props.movie.imageSrc} alt=""/>
      </div>
        <h2>{this.props.movie.title}</h2>
        <p>{this.props.movie.date}</p>
        <p>{this.props.movie.synopsis}</p>
    </div>
    )
  }
}

export default QueryResultsSummary;
