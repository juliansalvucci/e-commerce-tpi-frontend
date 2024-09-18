import * as yup from "yup";

const alMenosUnaLetra = /[a-zA-Z]/;
//const primeraLetraMayusculaNoNumero = /^[A-Z][^\d]*$/;
const sinCaracteresEspeciales = /^[a-zA-Z0-9\s]+$/;
const soloNumeros = /^\$?\d+(?:\.\d+)*$/;

/*// Función que consulta la API para verificar si un nombre ya existe
const isUnique = async (tipoClase, nombre) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/${tipoClase}?name=${nombre}`
    );
    return response.data.exists === false; // Supongamos que la API devuelve un campo "exists"
  } catch (error) {
    console.error("Error al consultar la API:", error);
    return false; // En caso de error, asumimos que la validación falla
  }
};*/

export const brandSchema = yup.object().shape({
  nombre: yup
    .string()
    .required("Obligatorio")
    .matches(alMenosUnaLetra, "El nombre debe contener al menos una letra"),
});

export const subCategorySchema = yup.object().shape({
  nombre: yup
    .string()
    .required("Obligatorio")
    .matches(alMenosUnaLetra, "El nombre debe contener al menos una letra"),
  descripcion: yup.string().notRequired(),
  categoria: yup.string().required("Obligatorio"),
});

export const categorySchema = yup.object().shape({
  nombre: yup
    .string()
    .required("Obligatorio")
    .matches(alMenosUnaLetra, "El nombre debe contener al menos una letra"),
  descripcion: yup.string().required("Obligatorio"),
});

export const productSchema = yup.object().shape({
  nombre: yup
    .string()
    .required("Obligatorio")
    .min(2, "El nombre debe contener al menos 2 caracteres")
    .matches(alMenosUnaLetra, "El nombre debe contener al menos una letra")
    //.matches(primeraLetraMayusculaNoNumero, "El primer caracter debe ser una letra mayúscula")
    .matches(
      sinCaracteresEspeciales,
      "El nombre no debe contener caracteres especiales"
    ),
  descripcion: yup.string().required("Obligatorio"),
  precio: yup
    .string()
    .required("Obligatorio")
    .matches(soloNumeros, "El precio debe contener solo números")
    .test("precio-mayor-a-0", "El precio debe ser mayor a $0", (value) => {
      const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
      return numericValue >= 1;
    }),
  marca: yup.string().required("Obligatorio"),
  subcategoria: yup.string().required("Obligatorio"),
});
