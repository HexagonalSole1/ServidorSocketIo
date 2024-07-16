import zod from "zod";

const movieSchema = zod.object({
  nombre: zod.string({
    invalid_type_error: "nombre must be a string",
    required_error: "nombre is required",
  }),
  descripcion: zod.string({
    invalid_type_error: "correo must be a string",
    required_error: "apellido is required",
  }),
  calificacion: zod.number({
    invalid_type_error: "calificacion must be a number",
    required_error: "telefono is required",
  }),
  url_movie: zod.string({
    invalid_type_error: "url de la pelicula must be a string",
    required_error: "apellido is required",
  }),
});

export const validarMovie = (object) => {
  return movieSchema.safeParse(object);
};

export const validarMovieParcial = (object) => {
  return movieSchema.partial().safeParse(object);
};
