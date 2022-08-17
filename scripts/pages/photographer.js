//trouve l ID  du photographer
 
const request = new URLSearchParams(location.search);
const photographerId = request.get("photographer");
 
 
fetch("./data/photographers.json")
  .then(function (response) {
    return response.json();
  })
 
  .then(function (response) { //renvoi des medias et des photographes
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
  //displayLightBox(medias); //affiche le carousel*/
  displayMedias(medias); //affiches les medias
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
  
  <article class="article_media" data-title="${title}" data-date=${date} data-likes="${likes}" >
    <div class="grillePhotosProfil_main">
        <a href="#" class= "media" id="${id}" aria-label="ouvrir la media">
            ${mediasPhotographe}
            <div class="titreLike">
                <h3 aria-label="Titre du média" class="titreMedia">${title}</h3>
                <span aria-label="Nombre like du média" class="nombreLike">${likes} <i class="fa-solid fa-heart"></i> </span>
            </div>
        </a>
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
 
 
/***********        TRI      ************************/  
function sortMediasByType(type) {
    let medias = document.querySelectorAll(".article_media");
    medias = [].slice.call(medias);
    console.log(medias)
    if (type === "titre") { 
        sortByTitle(medias);
    }
    else if (type === "date") {
        sortByDate(medias); // Par date
    }
    else {
        sortByLike(medias); // sinon Pop
    }

  
    /***************   Titre   ***********************/
    function sortByTitle(medias) {
        medias.sort(function (a, b) {
            return a.dataset.title.localeCompare(b.dataset.title);
        });
    }
  
    /***************    Pop  *******************/
    function sortByLike(medias) {
        medias.sort(function (a, b) {
            return b.dataset.likes - a.dataset.likes;
        });
    }
  
    /****************   Date   ***********************/
    function sortByDate(medias) {
        medias.sort(function (a, b) {
            return a.dataset.date.localeCompare(b.dataset.date);
        });
    }
 
    const gallerieMedia = document.querySelector(".gallerieMedia");
    gallerieMedia.innerHTML = "";
 
    medias.forEach(media => {
        gallerieMedia.append(media);
    });
}


/****************** LIGHTBOX ********************/

// Elements
const fondLightbox = document.querySelector(".lightbox-background");
const lightbox = document.querySelector(".lightbox-media");
const suivante = document.querySelectorAll(".droite");
const precedente = document.querySelectorAll(".gauche");
const titre = document.querySelectorAll(".titre-media");
const croixFermer = document.querySelectorAll(".fermer"); // Fermer la modale
const photosLightbox = document.querySelectorAll(".article_media");
// Fermer

photosLightbox.forEach(() => addEventListener("click", launchLighbox));
croixFermer.forEach((btn) => btn.addEventListener("click", closeLightbox)); // Fermer la modale

// Modal form
function launchLighbox () {
  fondLightbox.style.display = "block";
  lightbox.style.display = "block";

}
function closeLightbox() {
  fondLightbox.style.display = "none";
  lightbox.style.display = "none"; 
}