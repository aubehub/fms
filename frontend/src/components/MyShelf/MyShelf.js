import React from 'react';
import { getShelf } from '../../services/api';
import './MyShelf.css';


class MyShelf extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      savedMovies:[]
    }
  }

  componentDidMount(){
    getShelf().then(res => {
      this.setState({
        savedMovies: res
      })
    })
  }
  
  getDate(isoDate) {
    let date = new Date(isoDate);
    return (date.getMonth()+1) + '/'+date.getDate() + '/'+ date.getFullYear();
  }

  render(){
    
    return (
      <div className="my-shelf-list">
        {this.state.savedMovies.map(el=>
          <div>
            <h4>{el.title}</h4>
            <h6>{this.getDate(el.year)}</h6>
            <p className="synopsis">{el.synopsis}</p>
          </div>
        )}
      </div>
    )
  }
}
//Pedir al servidor que MySelf sea una lista con categorías
//Para cada categoría habría que importar CategoryShelfList y pasarle como parámetros cada una de las categorías y las películas asociadas a esa categoría
/* si el servidor responde con algo como 
{ 
  "categoria A": [ { movie1 }, { movie2 }, ...], 
  "categoria B": [ { movie3 }, { movie4 }, ... ],
  ...
}
Object.keys(response).map(key => {
  <CategoryShelfList movies={response[key]} category={key} key={key} />
})
   */


export default MyShelf;