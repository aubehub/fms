import React from 'react';
import './Movie.css'
import { saveCategory, getUserCategories, saveMovie } from '../../services/api'
import { Link } from 'react-router-dom';
import { Tooltip, AutoComplete } from 'antd';

class Movie extends React.Component {
  constructor(props){  
    super(props);  
    this.state = { 
      showBoxAdd: false,
      value:"",
      options: [],
      existingCategories: [], //las categorias que ya tiene el usuario creadas. Por ej, si ya exieste 'oldies' que se autocomplete cuando empiezo a escribir
      searching: false,
      categories: [] //las categorías bajo las que se guardó la peli, que deberían aparecer cuando estando logeada pincho en una peli guardada
    };
  }
/*
  componentDidMount() {
    getUserCategories().then(obj => {
      /*
      debería ir a mi servidor y traer las categorías asociadas a la pelicula que se está mirando
      this.setState({
        categories: obj.map(el => el.name)
      })
//   
     this.setState({
        existingCategories: obj.map(el=>({
          value: el.id + "",
          label: el.name,
        }))
      })
    })
  }
   */  
  toggleShowBoxAdd = () => {  
    this.setState({  
      showBoxAdd: !this.state.showBoxAdd  
    });  
  }

  onSearch = (searchText) => {
    this.setState({
      searching: !!searchText
    });
  }

  onSelect = (idCategory, option) => {
    this.setState({
      searching: false,
      categories: [ ...this.state.categories, option.label ],
    });
    saveMovie(this.props.movie, 0, idCategory)
  }

  getDate(isoDate) {
    let date = new Date(isoDate);
    return (date.getMonth()+1) + '/'+date.getDate() + '/'+ date.getFullYear();
  }

  onCategoryPick = (evt) => {
    if (evt.key === 'Enter') {
      saveCategory(this.state.value, 0)
      //Función que llama al backend y crea la categoria
      this.setState({
        searching: false,
        categories: [ ...this.state.categories, this.state.value ],
      });
    }
  }

  onCategoryChange = (input) => {
    this.setState({
      value: input
    })
  }


  render(){

    let genresNames = this.props.movie.genres ? this.props.movie.genres.map((g) => g.name).join(", ") : "";
    
    return (
    <div className="movie-info">
        <div className="img-container">
          <Link to={`/movie/${this.props.movie.id}`}>
            <img className="poster" src={this.props.movie.imageSrc} alt=""/></Link>
        </div>
        <div className="second-info">
          <Link to={`/movie/${this.props.movie.id}`}>  
            <h5 className="titles">{this.props.movie.title}</h5></Link>
          <p className="date">{this.getDate(this.props.movie.date)}</p>
          <p>{genresNames}</p>
          {this.props.movie.rating &&
          <p className="movie-rating">Average rating: {this.props.movie.rating}</p>}
          {this.props.movie.rating &&
          <p className="overview">Overview</p>}
          <p className="line-clamp">{this.props.movie.synopsis}</p>
      </div>
      
      {this.props.movie.rating && (
        <div className="btn-add-cont">
          <Tooltip placement="bottom" title={"Add to Shelf"}>
            <button className="btn-add" onClick={this.toggleShowBoxAdd}>+</button>
          </Tooltip>
          {this.state.categories.map((c, idx) => (<button key={idx}>{c}</button>))}
          {this.state.showBoxAdd && (
            <div className="box-add">
              <label>Create category</label>
              <AutoComplete
                filterOption={(i, o) => o.label?.includes(i)}
                placeholder="My favorites, Comedy, Oldies..."
                options={this.state.existingCategories}
                onSearch={this.onSearch}
                onChange={this.onCategoryChange} 
                onSelect={this.onSelect}
                style={{
                  width: 200,
                }}
                open={this.state.searching} // true cuando tipeo algo, sino false
                onKeyUp={this.onCategoryPick}
              />
            </div>
          )}
        </div>
      )}
    </div>
    )
  }
}

export default Movie;

