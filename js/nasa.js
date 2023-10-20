const btnBuscarAsteroides = document.getElementById("btnBuscarAsteroides");
const nasaApi = `https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-10-13&end_date=2023-10-20&api_key=DEMO_KEY`;

btnBuscarAsteroides.addEventListener("click", () => {
  fetch(nasaApi)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("No se pudo obtener la respuesta.");
      }
    })
    .then((data) => {
      const asteroides = data.near_earth_objects;

      const asteroidesPeligrosos = asteroides["2023-10-13"].filter((ast) => {
        return ast.is_potentially_hazardous_asteroid;
      });

      asteroidesPeligrosos.forEach((asteroide) => {
        console.log(
          "El asteroide mas peligroso de la semana pasada se llama:",
          asteroide.name
        );
        console.log(
          "Diámetro mínimo (m):",
          asteroide.estimated_diameter.meters.estimated_diameter_min
        );
        console.log(
          "Diámetro máximo (m):",
          asteroide.estimated_diameter.meters.estimated_diameter_max
        );
        console.log(
          "Distancia de aproximación (km):",
          asteroide.close_approach_data[0].miss_distance.kilometers
        );
        console.log("***************************************************");
      });
    })
    .catch((error) => {
      console.error("Error al obtener información de asteroides:", error);
    });
});

//https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-10-13&end_date=2023-10-20&api_key=DEMO_KEY