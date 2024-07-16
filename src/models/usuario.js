import zod from "zod";

const usuarioSchema = zod.object({
  nombre: zod.string({
    invalid_type_error: "nombre must be a string",
    required_error: "nombre is required",
  }),
  correo: zod.string({
    invalid_type_error: "correo must be a string",
    required_error: "apellido is required",
  }),
  contrasena: zod.string({
    invalid_type_error: "contraseña must be a string",
    required_error: "telefono is required",
  })
});

export const validarUsuario = (object) => {
  return usuarioSchema.safeParse(object);
};

export const validarUsuarioParcial = (object) => {
  return usuarioSchema.partial().safeParse(object);
};
