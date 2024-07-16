import db from "../config/db.js";




export const createMovie = (movie) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO peliculas (nombre, descripcion, calificacion, url_movie)
      VALUES (?, ?, ?, ?);
    `;

    db.execute(query, [movie.nombre, movie.descripcion, movie.calificacion, movie.url_movie])
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};





export const getMovies = () => {
    return new Promise((resolve, reject) => {
        const query = `
      SELECT *
      FROM peliculas  order by id_pelicula desc
    `;

        db.execute(query)
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getMoviesPopular = () => {
    return new Promise((resolve, reject) => {
        const query = `
        SELECT * FROM movies_forum.peliculas ORDER BY calificacion desc limit 10;
    `;

        db.execute(query)
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getMoviesById = (movieId) => {
    return new Promise((resolve, reject) => {
        const query = `
        SELECT *
        FROM peliculas
        WHERE id_pelicula = ?
      `;

        db.execute(query, [movieId])
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
};


export const getChatsUsuarioPriv = (usuarioId) => {
    return new Promise((resolve, reject) => {
        const query = `
     
        SELECT u.usuarioId, u.correo, u.contrasena, u.logo, u.ultimaConexion, u.nombre, u.ws
        FROM usuario u
        JOIN chatpriv c ON (u.usuarioId = c.usuarioId1 OR u.usuarioId = c.usuarioId2)
        WHERE (c.usuarioId1 = ? OR c.usuarioId2 = ?) AND u.usuarioId != ?;
         `;

        db.execute(query, [usuarioId, usuarioId, usuarioId])
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

