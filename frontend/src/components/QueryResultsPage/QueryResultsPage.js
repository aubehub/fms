import React from 'react';
import Movie from '../Movie/Movie';
import { queryForMovie } from '../../services/api'
import { withRouter } from "react-router";
import "./QueryResultsPage.css";

class QueryResultsPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      searchEntered: false,
    };
  }
  
  getResults() {
    const query = this.props.match.params.query;
    queryForMovie(query).then(res => {
      this.setState({
        searchEntered:true,
        movies: res.results.map((obj) => {
          return {
            id: obj.id,
            imageSrc: `https://image.tmdb.org/t/p/w92/${obj.poster_path}`,
            title: obj.original_title,
            date: obj.release_date,
            synopsis: obj.overview
          }
        })
      })
    })
  }

  componentDidMount() {
    this.getResults();
  }

  componentDidUpdate() {
    this.getResults();
  }

  render(){
    return (
      <div className="query-results">
        {
          this.state.movies.length > 0 ? this.state.movies.map(movie => {
            return <Movie movie={movie} key={movie.id} />
          }) : "no hay resultados"
        }
      </div>
    )
  }
}

export default withRouter(QueryResultsPage);