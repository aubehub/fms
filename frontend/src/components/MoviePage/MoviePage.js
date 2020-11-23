import React from 'react';
import './MoviePage.css'
import { queryForOneMovie } from '../../services/api'
import { withRouter } from "react-router";
import Movie from '../Movie/Movie';

class MoviePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movie: null
    }
  }

  componentDidMount() {
    const movieId = this.props.match.params.movieId
    queryForOneMovie(movieId).then(obj => {
      this.setState({
        movie: {
          id: movieId,
          imageSrc: `https://image.tmdb.org/t/p/w300/${obj.poster_path}`,
          title: obj.original_title,
          date: obj.release_date,
          genres: obj.genres,
          rating: obj.vote_average,
          synopsis: obj.overview
        }
      })
    })
  }

  render(){
    return (
        <div className="movie-page">
        {
          this.state.movie ? (
            <Movie movie={this.state.movie} />
          ) : "no hay resultados"
        }
        </div>
    )
  }
}

export default withRouter(MoviePage);

