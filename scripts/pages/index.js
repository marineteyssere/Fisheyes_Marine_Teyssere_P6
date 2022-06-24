    
async function getPhotographers() {
// Penser à remplacer par les données récupérées dans le json
const listeJSON = await fetch("data/photographers.json")/*Promesse Récupération de données à partir d’un fichier JSON*/
const listePhotographes = await listeJSON.json();
console.log(listePhotographes);
return listePhotographes;
}
        
/* const listePhotographes = fetch("data/photographers.json")
.then (res => res.json())/*Promesse Récupération de données à partir d’un fichier JSON*/
/*console.log (listePhotographes);
then(res => { // recupere les donnees du fichier
return res.photographers;
  })
.catch(console.log('Une erreur est survenue: ', err));*/

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
    