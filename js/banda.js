//Solo se puede testear con "coldplay"
const buscarGenero = document.getElementById("buscarGenero");
const btnGenero = document.getElementById("btnGenero");

btnGenero.addEventListener("click", () => {
  const genero = buscarGenero.value.toLowerCase();
  const apiBanda = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${genero}`;
  let nombreBanda = "";
  let tipoGenero = "";
  fetch(apiBanda)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("No se pudo obtener la respuesta.");
      }
    })
    .then((banda) => {
      if (banda.artists && banda.artists.length > 0) {
        nombreBanda = banda.artists[0].strArtist;
        console.log(`El nombre de la banda es: ${nombreBanda}`);
        tipoGenero = banda.artists[0].strGenre;
        console.log(`El género es: ${tipoGenero}`);
      } else {
        console.log("No se encontraron datos para ese género.");
      }
    })
    .catch((err) => {
      console.error("Error al obtener información de la banda:", err);
    });
});
