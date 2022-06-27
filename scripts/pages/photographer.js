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
  sortMediasByType(medias) //trie des medias par type
  displayLightBox(medias); //affiche le carousel
  displayMedias(medias); //affiches les medias
  console.log(medias);
  //dispatchEvent(medias);//declenchement des evenements
}

/* eslint-disable no-unused-vars */
/*******          elements partie Header profil du photographe   ******/
function headerFactory(photographe) {
  const { name, portrait, city, country, tagline, id } = photographe;
  const image = `assets/photographers/${portrait}`;

  function getHeaderCardDOM() {
    const linkURL = "photographer.html";
    const url = `${linkURL}?photographer=${id}`;
    return ` 
      <div class="photograph-header">
            <div class="text-header">
              <h2>${name}</h2>
              <h3  aria-label="Pays du photographe" alt="Pays du photographe" tabindex="0">${city}, ${country}</h3>
              <h4  aria-label="phrase du photographe" alt="phrase du photographe" tabindex="0">${tagline}</h4>
            </div>
         
          <button class="contact_button" id="modal">Contactez moi</button>
      
          <img href=${url} src=${image} alt="photo" class="imagePhotographProfil" />
          
      </div>`;
  }

  return { name, image, getHeaderCardDOM };
}

/****     elements DOM partie GALERIES    **********/

function galleryFactory(data) {
  const { id, image, title, video, likes, date } = data;
  console.log(data);
  const mediasPhotographe = typeof image !== "undefined"
    ? `assets/images/${image}`
    : `assets/images/${video}`.replace('.mp4', '.jpg');
  return ` 
  <section class ="grillePhotosProfil_main">
    <<menu>
      <li><button onclick=>Popularité</button></li>
      <li><button onclick=>Date</button></li>
      <li><button onclick=>Filtres</button></li>
    </menu>
    <figure>
      <img src=${mediasPhotographe} alt="pictures" tabindex="0" class="media" data-media="${id}">
          <figcaption>
            <h3 class="titreMedia">${title}</h3>
            <span class="numberLike">${likes}</span>
          </figcaption>
    </figure>
    </section>`;
}

/****************************************************************************/

function displayDataHeader(photographer) {
  const profilHeaderModel = headerFactory(photographer);
  document.querySelector(".photograph-header").innerHTML = profilHeaderModel.getHeaderCardDOM();
  document.getElementById("nameModal").innerHTML = photographer.name;
  document.getElementById('photographerPrice').innerHTML = photographer.price;
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
  document.querySelector(".grillePhotosProfil_main").innerHTML = enregistrementDom.join('');
  // "join" renvoie une nouvelle chaîne de caractères en concaténant tous les éléments d'un tableau
  document.querySelector('#totalLike').innerHTML = totalLike;
  document.querySelector('.banniereLikes_sections').classList.remove('hide');
}


