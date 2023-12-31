const buscarLibro = document.getElementById("buscarLibro");
const btnBuscar = document.getElementById("btnBuscar");
const btnBuscarAutor = document.getElementById("btnBuscarAutor");
const buscarAutor= document.getElementById("buscarAutor");

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

btnBuscarAutor.addEventListener("click", () => {
  const autor = buscarAutor.value.toLowerCase();
  const autorApiUrl = `https://openlibrary.org/search.json?author=${autor}`;

  // Primera solicitud para obtener el título del libro
  fetch(autorApiUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("No se pudo obtener la respuesta del título.");
      }
    })
    .then((data) => {
      const libros = data.docs;
      if (libros.length > 0) {
        console.log(`Libros del autor "${autor}":`);
        libros.forEach((libro) => {
          console.log(`Título: ${libro.title}`);
        });
      } else {
        console.log(`No se encontraron libros del autor "${autor}".`);
      }
    })
    .catch((error) => {
      console.error(
        "Error al obtener información de los libros del autor",
        error
      );
    });
});
