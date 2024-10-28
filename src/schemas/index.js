import * as yup from "yup";

const alMenosUnaLetra = /[a-zA-Z]/;
const primerCharacterLetraONumero = /^[a-zA-Z0-9]/;
const primerCharacterLetra = /^[a-zA-Z]/;
const soloLetras = /^[a-zA-Z]+$/;

export const brandSchema = yup.object().shape({
  nombre: yup
    .string()
    .required("Obligatorio")
    .min(2, "El nombre debe contener al menos 2 caracteres")
    .max(30, "El nombre debe tener como maximo 30 caracteres")
    .matches(
      primerCharacterLetraONumero,
      "El primer caracter debe ser una letra o un número"
    )
    .matches(alMenosUnaLetra, "El nombre debe contener al menos una letra"),
});

export const categorySchema = yup.object().shape({
  nombre: yup
    .string()
    .required("Obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(30, "El nombre debe tener como maximo 30 caracteres")
    .matches(alMenosUnaLetra, "El nombre debe contener al menos una letra")
    .matches(primerCharacterLetra, "El primer caracter debe ser una letra"),
});

export const subCategorySchema = yup.object().shape({
  nombre: yup
    .string()
    .required("Obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(30, "El nombre debe tener como maximo 30 caracteres")
    .matches(alMenosUnaLetra, "El nombre debe contener al menos una letra")
    .matches(primerCharacterLetra, "El primer caracter debe ser una letra"),
  categoria: yup.string().required("Obligatorio"),
});

export const productSchema = yup.object().shape({
  nombre: yup
    .string()
    .required("Obligatorio")
    .min(2, "El nombre debe contener al menos 2 caracteres")
    .max(60, "El nombre debe tener como maximo 60 caracteres")
    .matches(
      primerCharacterLetraONumero,
      "El primer caracter debe ser una letra o un número"
    )
    .matches(alMenosUnaLetra, "El nombre debe contener al menos una letra"),
  color: yup
    .string()
    .required("Obligatorio")
    .min(3, "El color debe contener al menos 2 caracteres")
    .max(20, "El color debe tener como maximo 20 caracteres")
    .matches(soloLetras, "El color debe contener solo letras"),
  tamaño: yup.string().notRequired(),
  marca: yup.string().required("Obligatorio"),
  categoria: yup.string().required("Obligatorio"),
  subcategoria: yup.string().required("Obligatorio"),
  precio: yup
    .number()
    .positive("El precio debe ser mayor a $0")
    .required("Obligatorio"),
  stock: yup
    .number()
    .min(0, "El stock disponible debe ser mayor o igual a 0")
    .required("Obligatorio"),
  stockMin: yup
    .number()
    .min(0, "El stock minimo debe ser mayor o igual a 0")
    .required("Obligatorio"),
  imagen: yup.string().notRequired().url("Debe ser una URL válida"),
  descripcion: yup
    .string()
    .required("Obligatorio")
    .max(100, "Maximo 100 caracteres"),
});

export const registerSchema = yup.object().shape({
  nombre: yup.string().required("El nombre es obligatorio"),
  apellido: yup.string().required("El apellido es obligatorio"),
  dateBirth: yup.string().datetime().required("La fecha de nacimiento es obligatoria"),
  email: yup
    .string()
    .email("Correo electrónico inválido")
    .required("El correo electrónico es obligatorio"),
  password: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(22, "La contraseña debe tener como máximo 22 caracteres")
    .required("La contraseña es obligatoria"),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Correo electrónico inválido")
    .required("El correo electrónico es obligatorio"),
  password: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(22, "La contraseña debe tener como máximo 22 caracteres")
    .required("La contraseña es obligatoria"),
});
