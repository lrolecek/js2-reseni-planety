import { get } from "http";

let planets = [];
let people = [];
const planetsElement = document.querySelector('#planets');
const peopleElement = document.querySelector('#people');


getPlanets()
  .then(data => {
    console.log('Jupíí, máme data');
    planets = data;
    showPlanets();

    getPeople(planets[0].people);
  });
  //.catch(error => console.log('Došlo k chybě'));




async function getPeople(persons) {


  let personPromises = persons.map(person => {
    return getPerson(person);
  });

  Promise.all( personPromises )
    .then(responses => {
      people = responses;
      showPeople();
    });

}


function showPeople() {

  let html = '';
  people.forEach(person => {
    html = html + `
      <div class="person">
        <div class="person__icon"><i class="fas fa-robot"></i></div>
        <h2 class="person__name">${person.name}</h2>
        <p class="person__info">
          Hair: ${person.hair}<br>
          Eyes: ${person.eyes}<br>
          Height: ${person.height} cm
        </p>
      </div>
    `;
  });

  peopleElement.innerHTML = html;
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







function showPlanets() {

  /*
  let html = '';
  planets.forEach(planet => {
    html = html + `
    <div class="planet">
      <div class="planet__name">${planet.name}</div>
      <div class="planet_count">${planet.people.length} <i class="fas fa-child"></i></div>
    </div>
    `;
  });
  */

  let html = planets.reduce((total, planet) => {
    return total + `
      <div class="planet">
        <div class="planet__name">${planet.name}</div>
        <div class="planet_count">${planet.people.length} <i class="fas fa-child"></i></div>
      </div>
    `;
  }, '');

  planetsElement.innerHTML = html;
}




async function getPlanets() {
  let response = await fetch('https://swapi.co/api/planets/');
  let data = await response.json();

  return data.results.map(planet => {
    return {
      name: planet.name,
      dayLength: planet.rotation_period,
      yearLength: planet.orbital_period,
      people: planet.residents
    }
  });

}