import { Router } from "express";

import usuariosRouter from "./usuarios.route.js";
import moviesRouter from "./moviesRouter.js";

const indexRouter = Router();
const prefijo = "/api";

indexRouter.get(prefijo, (req, res) => {
  res.send("Bienvenido a mi API").status(200);
});


indexRouter.use(`${prefijo}/usuarios`, usuariosRouter);
indexRouter.use(`${prefijo}/movies`, moviesRouter);


export default indexRouter;
