const poke_container = document.getElementById("poke-container");
const pokemon_count = 100;
const colors = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#98d7a5",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",
};

const main_types = Object.keys(colors);

//Tämä funktio hakee pokemonien tiedot API:sta id:n mukaan
async function fetchPokemons() {
    for (let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i);
    }
}

//Tämä funktio hakee pokemonin tiedot API:sta
async function getPokemon(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    createPokemonCard(data);
}


function createPokemonCard(pokemon) {
    const pokemonEl = document.createElement("div");
    const pokemonCard = document.createElement("div");

    pokemonEl.classList.add("pokemon");
    pokemonEl.setAttribute("onclick", `dataPokemon(${pokemon.id})`);

    pokemonCard.classList.add("pokemonCard");

    pokemonCard.id = `card_${pokemon.id}`;

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, "0");

    const poke_types = pokemon.types.map((type) => type.type.name);
    const type = main_types.find((type) => poke_types.indexOf(type) > -1);
    const color = colors[type];

    pokemonEl.style.backgroundColor = color;
    pokemonCard.style.backgroundColor = color;
    pokemonCard.style.display = "none";

    //Tämä on HTML, mikä lisätään päädiviin ja näytetään käyttäjälle
    const pokemonInnerHTML = `
    <div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span> </small>
    </div>
    `;

    //Tämä on HTML, mikä lisätään lisätietoa pokemonista diviin ja näytetään tarvittaessa
    const pokemonCardInnerHTML = `
    <button class="cardBackButton" onclick="goBack(${pokemon.id})">Back</button>
    <div class="cardImageContainer">
        <img class="cardImage" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="">
    </div>
        
    <div class="cardInfo">
        <p class="cardData">Name: ${name}</p>
        <p class="cardData">Type: ${type}</p>
        <p class="cardData">Height: ${pokemon.height}</p>
        <p class="cardData">Weight: ${pokemon.weight}</p>
        <p class="cardData">Pokemon id: ${pokemon.id}</p>
    </div>
    `;

    //Tässä entiset HTML jutut lisätään diveihin
    pokemonEl.innerHTML = pokemonInnerHTML;
    pokemonCard.innerHTML = pokemonCardInnerHTML;

    //Tässä entiset divit lisätään päädiviin
    poke_container.appendChild(pokemonEl);
    cardContainer.appendChild(pokemonCard);
}

//Tämä funktio piilottaa päädivin ja näyttää pokemonin lisätietoja
function dataPokemon(id) {
    document.getElementById("poke-container").style.display = "none";
    document.getElementById(`card_${id}`).style.display = "block";
}

//Tämä funktio piilottaa lisätiedot ja näyttää päädivin
function goBack(id) {
    document.getElementById("poke-container").style.display = "flex";
    document.getElementById(`card_${id}`).style.display = "none";
}

//Tästä alkaa ohjelma
fetchPokemons();
