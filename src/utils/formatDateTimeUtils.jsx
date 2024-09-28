const formatDateTime = (datetime) => {
  const date = new Date(datetime);
  const formattedDate = date.toLocaleDateString("es-ES"); // Formato de fecha en español
  const formattedTime = date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return `${formattedDate} : ${formattedTime}`;
};

export default formatDateTime;
