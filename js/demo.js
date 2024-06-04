

async function getPokemons() {
	const responce = await fetch('https://reactmarathon-api.netlify.app/api/pokemons');
	const body = await responce.json();
	console.log(body);
	return body;
}

getPokemons();