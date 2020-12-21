export const attemptRegist = (email, username, password) => {
  return postData("http://localhost:4000/users",
  {
    email,
    username,
    password
  }).then(r => r.json())
}

export const attemptLogin  = (email, password) => {
  return postData("http://localhost:4000/user_login",
    {
      email, 
      password
    }
  ).then(r => r.json())
}

export const searchMovie = (query) => {
  return fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=ff086add9be8634349e24a34846cf4f3`)
    .then(r => r.json());
}

export const getOneMovie = (id) => {
  return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=ff086add9be8634349e24a34846cf4f3`)
    .then(r => r.json());
}

export const getGenres = () => {
  return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=ff086add9be8634349e24a34846cf4f3&language=en-US`).then(r => r.json())
}

export const saveMovie = (movie, id_user, id_category) => {
  return postData("http://localhost:4000/movies", 
    {
    id_user,
    id_category,
    id_movie: movie.id,
    title: movie.title,
    year: movie.date,
    synopsis: movie.synopsis
    }
  )
}

export const saveCategory = (name, userId) => {
  return postData("http://localhost:4000/categories",
    {
      name, 
      userId
    }
  )
}

export const getUserCategories = () => {
  return fetch("http://localhost:4000/categories")
    .then(r => r.json())
}
//?

export const getShelf = () => {
  const token = window.localStorage.getItem("token");

  const headers = {
    'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
    
  };
  if (token) {
    headers['access-token'] = token;
  }
  return fetch("http://localhost:4000/movies", { headers }).then(r => r.json())
}

//Funcion para hacer peticiones post. 2 argumentos (url por defecto, contenido/datos)
async function postData(url = "http://localhost:4000", data = {}) {
  const token = window.localStorage.getItem("token");

  const headers = {
    'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
    
  };
  if (token) {
    headers['access-token'] = token;
  }
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers,
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  }).then((res) => {
    if (res.status === 403) {
      localStorage.clear();
      window.location.reload();
    }
    return res;
  });
  console.log(response)
  return response; // parses JSON response into native JavaScript objects
}

// Almacenar el token en window.localStorage.setItem("token", res.token) en el componente (creo que sería en app) a traves del resultado de la promesa de attemptLogin (que es la respuesta del servidor)
  