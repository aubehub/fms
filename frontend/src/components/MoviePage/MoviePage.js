import React from 'react';
import './MoviePage.css'
import { getOneMovie } from '../../services/api'
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
    getOneMovie(movieId).then(obj => {
      /* queryForOneMovie trae a través de fetch los datos de TMDB (se puede mirar el formato en la pestaña network de las devtools)
         fetch devuelve una promesa, la forma de trabajar con promesas es llamar al método then de las mismas pasando un callback como parámetro
         ese callback recibe como parámetro la respuesta de la promesa (en este caso la promesa es un fetch asi que la respuesta es la de TMDB)
         Finalmente sobre esa respuesta hacemos un setState que procesa la respuesta y guarda solo lo que nos interesa.
      */
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

/*MoviePage hace una llamada a TMDB para traer una pelicula por su ID y actualiza el estado y se lo pasa a Movie como prop */