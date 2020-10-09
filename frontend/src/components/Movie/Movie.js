import React from 'react';
import './Movie.css'
import { getGenres, saveCategory } from '../../services/api'
import { Link } from 'react-router-dom';
import { Input, Tooltip, AutoComplete } from 'antd';
import { saveMovie } from '../../services/api'

let genres;
getGenres().then(res => genres = res.genres);

const catOptions = ["drama", "comedy", "action", "science fiction", "musical", "documentary", "western", "horror", "thriller", "animation", "fantasy", "adventure"].map((s) => ({ value: s}));

class Movie extends React.Component {
  constructor(props){  
    super(props);  
    this.state = { 
      showBoxAdd: false,
      value:"",
      options: [],
      searching: false,
      categories: []
    };

    this.toggleShowBoxAdd = this.toggleShowBoxAdd.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onCategoryPick = this.onCategoryPick.bind(this);

  }
  
  toggleShowBoxAdd() {  
    this.setState({  
      showBoxAdd: !this.state.showBoxAdd  
    });  
  }

  onSearch (searchText) {
    this.setState({
      searching: !!searchText
    });
  }

  onSelect (selectValue) {
    this.setState({
      searching: false,
      categories: [ ...this.state.categories, selectValue ],
    });
    saveMovie(this.props.movie, 0, 0)
  }

  getDate(isoDate) {
    let date = new Date(isoDate);
    return (date.getMonth()+1) + '/'+date.getDate() + '/'+ date.getFullYear();
  }

  onCategoryPick(evt) {
    if (evt.key === 'Enter') {
      saveCategory(this.state.value, 0)
      //Función que llama al backend y crea la categoria
      this.setState({
        searching: false,
        categories: [ ...this.state.categories, this.state.value ],
      });
    }
  }

  onCategoryChange(input) {
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
          {this.state.categories.map(c => (<button>{c}</button>))}
          {this.state.showBoxAdd && (
            <div className="box-add">
              <label>Create category</label>
              <AutoComplete
                filterOption={true}
                placeholder="My favorites, Comedy, Oldies..."
                options={catOptions}
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

