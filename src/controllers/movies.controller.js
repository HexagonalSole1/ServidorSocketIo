import * as moviesModel from "../models/movies.model.js";
import * as moviesServices from "../services/movies.service.js";

export const createMovie = async (req, res) => {
  const validacion = moviesModel.validarMovie(req.body);
  if (!validacion.success) {
    return res.status(422).json({
      message: "datos invalidos",
      error: JSON.parse(validacion.error.message),
    });
  }


  const movieValidated = {
    ...validacion.data,
  };
  moviesServices.createMovie(movieValidated).then(() => {
    res.status(201).json({
      data: movieValidated.nombre,
      message: `Pelicula creada exitosamente`,
    });
    responderNotificacion(movieValidated); 

  })
    .catch((err) => {
      res.status(406).json({
        message: "hubo un error al crear la pelicula",
        error: err.message,
      });
    });

};

let responsesClientes = [];


export const notificarNuevaPelicula = (res) => {
  return new Promise((resolve, reject) => {
    responsesClientes.push(res);

    res.on('close', () => {
      const index = responsesClientes.indexOf(res);
      if (index !== -1) {
        responsesClientes.splice(index, 1);
      }
    });

    resolve(responsesClientes.length);
  });
};

function responderNotificacion(movie) {
  for (const res of responsesClientes) {
    res.status(200).json({
      success: true,
      movie
    });
  }

  responsesClientes = []; 
}




export const notificacionNuevasPeliculas = async (req, res) => {
  responsesClientes.push(res);

  // [res1, res2, res3]
  req.on('close', () => {
      const index = responsesClientes.length; 
      responsesClientes = responsesClientes.slice(index, 1);
  });

};


//Listo
export const getMovies = async (req, res) => {

  moviesServices.getMovies().then((response) => {
    res.status(201).json({
      data: response[0],
      message: `Las peliculas son las siguientes`,
    });
  })
    .catch((err) => {
      res.status(406).json({
        message: "hubo un error al obtener las peliculas",
        error: err.message,
      });
    });

};

//Listo
export const getMoviesPopular = async (req, res) => {

  moviesServices.getMoviesPopular().then((response) => {
    res.status(201).json({
      data: response[0],
      message: `Las peliculas son las siguientes`,
    });
  })
    .catch((err) => {
      res.status(406).json({
        message: "hubo un error al obtener las peliculas",
        error: err.message,
      });
    });

};
export const getMoviesById = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await moviesServices.getMoviesById(id);
    console.log(movie[0])

    if (movie[0].length == 0) {
      return res.status(404).json({
        message: "La película no existe",
      });
    }

    res.status(200).json({
      message: "Película obtenida correctamente",
      data: movie[0],
    });
  } catch (err) {
    res.status(500).json({
      message: "Hubo un error al obtener la película",
      error: err.message,
    });
  }
};

