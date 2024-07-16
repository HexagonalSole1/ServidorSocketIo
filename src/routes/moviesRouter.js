import { Router } from "express";
import * as moviesController from "../controllers/movies.controller.js";
import { verificarJWT } from "../middlewares/auth/auth.middleware.js";

const moviesRouter = Router();
moviesRouter.get("/notificacionNuevasPeliculas",verificarJWT, moviesController.notificacionNuevasPeliculas);
moviesRouter.get("/populars",verificarJWT, moviesController.getMoviesPopular);
moviesRouter.get("/",verificarJWT, moviesController.getMovies);
moviesRouter.get("/:id",verificarJWT, moviesController.getMoviesById);
moviesRouter.post("/",verificarJWT, moviesController.createMovie);


export default moviesRouter;
