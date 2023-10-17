fetch("https://pokeapi.co/api/v2/pokemon/?limit=20")
    .then(response => {
        // Procesar la respuesta
        if (response.ok) {
            return response.json(); // Si esperas datos JSON
        } else {
            throw new Error('No se pudo obtener la respuesta.');
        }
    })
    .then(data => {
        // Hacer algo con los datos
        console.log(data);
    })
    .catch(error => {
        // Manejar errores
        console.error(error);
    });