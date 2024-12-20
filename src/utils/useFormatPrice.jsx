const formatPrice = (value) => {
  if (value === null || value === undefined || value === "") {
    return "";
  }
  const numericValue = parseInt(value.toString().replace(/[^\d]/g, ""), 10);
  if (isNaN(numericValue)) { // Retornar vacío si no es un número válido
    return "";
  }
  // Formatear el número con separadores de miles
  return new Intl.NumberFormat("es-AR", {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericValue);
};

export default formatPrice;
