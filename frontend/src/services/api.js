export const queryForMovie = (query) => {
  return fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=ff086add9be8634349e24a34846cf4f3`)
    .then(r => r.json());
}

export const queryForOneMovie = (id) => {
  return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=ff086add9be8634349e24a34846cf4f3`)
    .then(r => r.json());
}

export const getGenres = () => {
  return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=ff086add9be8634349e24a34846cf4f3&language=en-US`).then(r => r.json())
}

export const saveMovie = (movie, id_user, id_category) => {
   postData("http://localhost:4000/movies", 
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
    postData("http://localhost:4000/categories",
    {
      name, 
      userId
    }
  )
}

export const getShelf = () => {
  return fetch("http://localhost:4000/movies").then(r => r.json())
}

async function postData(url = "http://localhost:4000", data = {}) {
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response; // parses JSON response into native JavaScript objects
}

