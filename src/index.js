const SWAPI_URL = 'https://swapi.co/api/';
let planets = [];
let people = [];
const planetsElement = document.querySelector('#planets');
const peopleElement = document.querySelector('#people');


// na začátku programu zavoláme funkci, která slibuje
// že vrátí data se seznamem planet
getPlanets()
  .then(data => {
    planets = data;
    showPlanets();
  })
  .catch(error => console.log(error));



function showPlanets() {
  let html = planets.reduce((prev, curr, idx) => {
    return prev + `
      <div class="planet" data-planet="${idx}">
        <div class="planet__name">${curr.name}</div>
        <div class="planet_count">${curr.people.length} <i class="fas fa-child"></i></div>
      </div>
    `;
  }, '');

  planetsElement.innerHTML = html;

  // attach event listeners
  document.querySelectorAll('.planet').forEach(el => el.addEventListener('click', handlePlanetClick));
}


function handlePlanetClick(e) {
  /*
  pokud jsme neklikli přímo na <li>, ale například na
  text uvnitř <li>, musíme najít nejbližšího rodiče s třídou
  .planet, což je ten HTML prvek, na kterém máme nastaveno
  ID planety uvnitř data-planet="..."
  */
  let element = e.target;
  if (!element.dataset.planet) {
    element = element.closest('.planet');
  }

  let planetId = element.dataset.planet;

  showPlanetDetail(planetId);
}


function showPlanetDetail(idx) {
  let planet = planets[idx];

  getPeople(planet.people)
    .then(data => {
      people = data;
      showPeople();
    });
}


function showPeople() {

  let html = people.reduce((prev, person) => {
    return prev + `
      <div class="person">
        <div class="person__icon"><i class="fas ${ person.gender === 'male' ? 'fa-male' : person.gender === 'female' ? 'fa-female' : 'fa-robot' }"></i></div>
        <h2 class="person__name">${person.name}</h2>
        <p class="person__info">
          Hair: ${person.hair}<br>
          Eyes: ${person.eyes}<br>
          Height: ${person.height} cm
        </p>
      </div>
    `;
  }, '');

  peopleElement.innerHTML = html;
}


async function getPeople(peopleUrls) {
  let peoplePromises = peopleUrls.map(url => {
    return getPerson(url);
  });

  let people = await Promise.all(peoplePromises);

  return people;
}


async function getPerson(url) {
  let response = await fetch(url);
  let data = await response.json();

  return {
    name: data.name,
    gender: data.gender,
    height: data.height,
    hair: data.hair_color,
    eyes: data.eye_color
  }
}





// getPlanets
// funkce vrací seznam planet stažený ze serveru
// resp. vrací promise, která při splnění obsahuje seznam planet
async function getPlanets() {
  // vyžádáme ze serveru odpověď a počkáme na ni
  let response = await fetch(`${SWAPI_URL}planets/`);
  // serverovou odpověď převedeme do json formátu a počkáme na výsledek
  let data = await response.json();

  // protože jsem předtím na data čekali,
  // tak zde si můžeme být jistí, že už je máme

  // jako hodnotu z funkce vrátíme ze serverových dat
  // pole "results", které obsahuje seznam planet
  // a které přemapujeme na jednodušší pole obsahující
  // pouze ty údaje, které se nám hodí
  return data.results.map(planet => {
    return {
      name: planet.name,
      terrain: planet.terrain,
      dayLength: planet.rotation_period,
      yearLength: planet.orbital_period,
      people: planet.residents
    }
  });
}