const buscarLibro = document.getElementById("buscarLibro");
const btnBuscar = document.getElementById("btnBuscar");

btnBuscar.addEventListener("click", () => {
  const nombre = buscarLibro.value.toLowerCase();
  const tituloApiUrl = `https://openlibrary.org/search.json?title=${nombre}`;
  let tituloLibro = "";

  // Primera solicitud para obtener el título del libro
  fetch(tituloApiUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("No se pudo obtener la respuesta del título.");
      }
    })
    .then((data) => {
      const libros = data.docs;
      //Si la longitud de la matriz es mayor que cero, significa que hay al menos un libro en la respuesta de la API
      if (libros.length > 0) {
        tituloLibro = libros[0].title;
        console.log(`Título: ${tituloLibro}`);

        // Verifica si hay un autor
        if (libros[0].author_name) {
          const autor = libros[0].author_name.join(", ");
          console.log(`Autor: ${autor}`);
        } else {
          console.log("Autor desconocido");
        }
      } else {
        console.log("Libro no encontrado");
      }
    })
    .catch((error) => {
      console.error("Error al obtener información del título del libro", error);
    });
});
