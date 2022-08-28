    
async function getPhotographers() {
const listeJSON = await fetch("data/photographers.json")/*Promesse Récupération de données à partir d’un fichier JSON*/
const listePhotographes = await listeJSON.json();
console.log(listePhotographes);
return listePhotographes;
}
        
async function displayData(photographers) {
const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    