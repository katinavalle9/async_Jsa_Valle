const buscarStar = document.getElementById("buscarStar");

(async () => {
  let personajeSelect = buscarStar.value;
  const apiStar = `https://swapi.dev/api/people/${personajeSelect}`;
  const personajesResponse = await (await fetch(apiStar)).json();
  // console.log(personajesResponse);
  Personajes(personajesResponse.results); //aqui le estoy pasando el array de results donde se encuentra sus propiedades
})();

function Personajes(personajesOpciones) {
  personajesOpciones.forEach((personaje) => {
    const crearOpcion = document.createElement("option");
    crearOpcion.value = personaje.url;
    crearOpcion.text = personaje.name;
    buscarStar.appendChild(crearOpcion);
  });

  buscarStar.addEventListener("change", () => {
    const seleccionado = buscarStar.value;
    if (seleccionado) {
      fetch(seleccionado)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("No se pudo obtener la respuesta.");
          }
        })
        .then((personaje) => {
          const peliculas = personaje.films;
          if (peliculas && peliculas.length > 0) {
            const peliculaPromises = peliculas.map((peliculaUrl) =>
              fetch(peliculaUrl).then((response) => response.json())
            );

            Promise.all(peliculaPromises)
              .then((peliculas) => {
                const nombresPeliculas = peliculas.map(
                  (pelicula) => pelicula.title
                );
                console.log(
                  `Las películas en las que aparece ${
                    personaje.name
                  }: ${nombresPeliculas.join(", ")}`
                );
              })
              .catch((error) => {
                console.error(
                  "Error al obtener los nombres de las películas:",
                  error
                );
              });
          } else {
            console.log(`No se encontraron películas para ${personaje.name}`);
          }
        })
        .catch((error) => {
          console.error(
            "Error al obtener la información del personaje:",
            error
          );
        });
    }
  });
}
