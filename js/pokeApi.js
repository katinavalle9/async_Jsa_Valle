//Opcion 1- buscar pokemon
const buscarPokemonInput = document.getElementById("buscarPokemon");
const buscarPokemonButton = document.getElementById("buscarPokemonButton");
const selectPokemon = document.getElementById("selectPokemon");

buscarPokemonButton.addEventListener("click", () => {
  const id = buscarPokemonInput.value.toLowerCase();
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;

  fetch(apiUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("No se pudo obtener la respuesta.");
      }
    })
    .then((pokemon) => {
      console.log(`Tipos de ${pokemon.name}:`);
      console.log(pokemon);
      pokemon.types.forEach((element) => {
        element.type.name;
        console.log(element.type.name);
      });
    })
    .catch((error) => {
      console.error("Error al obtener información del Pokémon:", error);
    });
});

//Opcion 2- buscar pokemon
(async () => {
  let pokemonesSelect = selectPokemon.value;
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonesSelect}?limit=1000`;
  const pokemonesResponse = await (await fetch(apiUrl)).json();
  if (
    pokemonesResponse &&
    pokemonesResponse.results &&
    pokemonesResponse.results.length > 0
  ) {
    const fetchPromises = pokemonesResponse.results.map(async (x) => {
      const response = await fetch(x.url);
      return response.json();
    });
    pokemones = await Promise.all(fetchPromises);
    renderPokemon(pokemones);
  }
})();

function renderPokemon(pokemonesFiltrados) {
  pokemonesFiltrados.forEach((pokemon) => {
    const nuevaOpcion = document.createElement("option");
    nuevaOpcion.value = pokemon.id;
    nuevaOpcion.text = pokemon.name;
    selectPokemon.appendChild(nuevaOpcion);
  });

  $("#selectPokemon").select2({
    allowClear: true,
    placeholder: "Selecciona una opción",
  });
  $("#selectPokemon").change(() => {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${$(
      "#selectPokemon"
    ).val()}`;
    fetch(apiUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("No se pudo obtener la respuesta.");
        }
      })
      .then((pokemon) => {
        console.log(`Tipos de ${pokemon.name}:`);
        console.log(pokemon);
        pokemon.types.forEach((element) => {
          console.log(element.type.name);
        });
      })
      .catch((error) => {
        console.error("Error al obtener información del Pokémon:", error);
      });
  });
}
