const buscaGeneracion = document.getElementById("buscaGeneracion");

(async () => {
  let pokeApi = `https://pokeapi.co/api/v2/generation/1`;
  const pokemonesResponse = await (await fetch(pokeApi)).json();
  console.log(pokemonesResponse);
  pokemonGeneracion(pokemonesResponse.pokemon_species);
})();

function pokemonGeneracion(pokemones) {
  pokemones.forEach((pokemon) => {
    const nuevaOpcion = document.createElement("option");
    nuevaOpcion.value = pokemon.url;
    nuevaOpcion.text = pokemon.name;
    buscaGeneracion.appendChild(nuevaOpcion);
  });
}

buscaGeneracion.addEventListener("change", () => {
  const generationUrl = buscaGeneracion.value;

  fetch(generationUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("No se pudo obtener la respuesta.");
      }
    })
    .then((generationData) => {
      console.log(generationData);

      const pokemonList = generationData.pokemon_species;

      let urlPomekemon = `https://pokeapi.co/api/v2/pokemon/${generationData.name}`;
      fetch(urlPomekemon)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("No se pudo obtener la respuesta.");
          }
        })
        .then((poke) => {
          console.log(`El nombre del pokemon es: ${poke.name}`);
          const moves = poke.moves.map((move) => move.move.name);
          console.log(`Sus movimientos son: ${moves.join(", ")}`);
          console.log(`Pesa: ${poke.weight}`);
          console.log(`Tiene un tamaño de: ${poke.height}`);
        });
    });
});
