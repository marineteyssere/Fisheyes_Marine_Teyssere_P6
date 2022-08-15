//trouve l ID  du photographer

const request = new URLSearchParams(location.search);
const photographerId = request.get("photographer");

fetch("./data/photographers.json")
  .then(function (response) {
    return response.json();
  })

  .then(function (response) { //alors renvoi des medias et des photographes
    const { photographers, media } = response;
    successPage(photographers, media, photographerId); //page ok photographers, medias, identifiant
    return;
  })
  .catch(function (response) {
    console.dir(response);
    return;
});

function successPage(photographers, media, photographerId) {
  
  const photographer = photographers.find((photographer) => { // on cherche info photographer
    return photographer.id == photographerId; // retourne  l'identifiant photographer
  });

  let medias = media.filter((media) => { // on filtre les medias du photographer concerné
    return media.photographerId == photographerId;
  });

  displayDataHeader(photographer); //affichage du header du photographe
  //sortMediasByType(medias) //trie des medias par type
  //displayLightBox(medias); //affiche le carousel*/
  displayMedias(medias); //affiches les medias
  console.log(medias);
  //dispatchEvent(medias);//declenchement des evenements
}

/* header */
/*******          elements partie Header profil du photographe   ******/
function headerFactory(photographe) {
  const { name, portrait, city, country, tagline, id, alt, } = photographe;
  const image = `assets/photographers/${portrait}`;
  const altprofil = `assets/photographers/${alt}`;
  

  function getHeaderCardDOM() {
    const linkURL = "photographer.html";
    const url = `${linkURL}?photographer=${id}`;
    return ` 
      <div class="photograph-header">
            <div class="text-header">
              <h2  aria-label="Nom du photographe" id="nameModal">${name}</h2>
              <h3  aria-label="Pays du photographe" tabindex="0">${city}, ${country}</h3>
              <h4  aria-label="Phrase du photographe" tabindex="0">${tagline}</h4>
            </div>
      
          <img href=${url} src=${image} alt="${alt}" class="imagePhotographProfil" />
          
      </div>`;
  }

  return { name, image, altprofil, getHeaderCardDOM };
}


/****     elements DOM partie GALERIES    **********/

function galleryFactory(data) {
  const { id, image, title, video, likes, date, alt, } = data;
 // console.log(data);
  let mediasPhotographe;
  if(image !== undefined) {
    mediasPhotographe = `<img src="assets/images/${image}" alt="${alt}" tabindex="0" data-media="${id}">`;
  } else {
  mediasPhotographe = `<video controls class="video_main"><source src="assets/images/${video}"></video>`;
  }
  return `
  
  <article>
  <div class ="grillePhotosProfil_main">

    <a href="#" class= "media" id="${id}" aria-label="ouvrir la media">

      ${mediasPhotographe}
           <div class="titreLike">
            <h3 aria-label="Titre du média" class="titreMedia">${title}</h3>
            <span aria-label="Nombre like du média" class="nombreLike">${likes} <i class="fa-solid fa-heart"></i> </span>
          </div>

  </div>
  </article>`
   
}

function displayDataHeader(photographer) {
  const profilHeaderModel = headerFactory(photographer);
  document.querySelector(".photograph-header").innerHTML = profilHeaderModel.getHeaderCardDOM();
  document.getElementById("nameModal").innerHTML = photographer.name;
  document.getElementById("photographerPrice").innerHTML = photographer.price + '€ / jour';
}

/*********** Affichage  des medias de l ID *******************************/
function displayMedias(medias) {
  // console.log(medias);
  let totalLike = 0;
  // On recreer chaque card Html stocker dans enregistrementDom
  const enregistrementDom = medias.map((media) => {
    totalLike += media.likes
    return galleryFactory(media);
  });
  
  //On ecrase la section des cards par la nouvelle
  document.querySelector(".grillePhotosProfil_main").innerHTML = enregistrementDom.join('');//affiche grille photo du photographe
  // "join" renvoie une nouvelle chaîne de caractères en concaténant tous les éléments d'un tableau
  document.querySelector('#totalLike').innerHTML = totalLike;//total like
  //document.getElementsByClassName('banniereLikes_section')[0].classList;
}

