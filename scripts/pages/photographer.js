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

  let medias = media.filter((media) => { // on filtre les medias du photographer concernĂ©
    return media.photographerId == photographerId;
  });

  displayDataHeader(photographer); //affichage du header du photographe
  /*sortMediasByType(medias) //trie des medias par type
  displayLightBox(medias); //affiche le carousel*/
  displayMedias(medias); //affiches les medias
  console.log(medias);
  //dispatchEvent(medias);//declenchement des evenements
}

/* header */
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
              <h2 id="nameModal">${name}</h2>
              <h3  aria-label="Pays du photographe" alt="Pays du photographe" tabindex="0">${city}, ${country}</h3>
              <h4  aria-label="phrase du photographe" alt="phrase du photographe" tabindex="0">${tagline}</h4>
            </div>
      
          <img href=${url} src=${image} alt="photo" class="imagePhotographProfil" />
          
      </div>`;
  }

  return { name, image, getHeaderCardDOM };
}


/****     elements DOM partie GALERIES    **********/

function galleryFactory(data) {
  const { id, image, title, video, likes, date } = data;
 // console.log(data);
  let mediasPhotographe;
  if(image !== undefined) {
    mediasPhotographe = `<img src="assets/images/${image}" alt="pictures" tabindex="0" data-media="${id}">`;
  } else {
  mediasPhotographe = `<video controls class="video_main"><source src="assets/images/${video}"></video>`;
  }
  return `
  
  <article>
  <div class ="grillePhotosProfil_main">

    <a href="#" class= "media" id="${id}" aria-label="ouvrir la media">

      ${mediasPhotographe}
           <div class="titreLike">
            <h3 class="titreMedia">${title}</h3>
            <span class="nombreLike">${likes} <i class="fa-solid fa-heart"></i> </span>
          </div>

  </div>
  </article>`
   
}

function displayDataHeader(photographer) {
  const profilHeaderModel = headerFactory(photographer);
  document.querySelector(".photograph-header").innerHTML = profilHeaderModel.getHeaderCardDOM();
  document.getElementById("nameModal").innerHTML = photographer.name;
  document.getElementById("photographerPrice").innerHTML = photographer.price + 'â‚¬ / jour';
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
  // "join" renvoie une nouvelle chaĂ®ne de caractĂ¨res en concatĂ©nant tous les Ă©lĂ©ments d'un tableau
  document.querySelector('#totalLike').innerHTML = totalLike;//total like
  //document.getElementsByClassName('banniereLikes_section')[0].classList;
}

///////////


function mediasParType(type) {
  if (type === "titre") { // si.... triera  par titres
      triTitre(medias);
  }
  else if (type === "date") {
      triDate(medias) // sinon   triera par date
  }
  else {
    triLike(medias); // sinon ce sera par  pop
  }
  
  /**  filter par titre ***/
  function triTitre(medias) {
      return medias.tri(function (a, b) {
           // triera par ordre alphabetique +1 ou -1 selon lettre
          if (a.title < b.title) { return -1; }
          if (a.title > b.title) { return 1; }
          return 0;
      });
  }

  /**  filter par like ***/
  function triLike(medias) {
      return medias.tri(function (a, b) {
          if (a.likes < b.likes) { return -1; }
          if (a.likes > b.likes) { return 1; }
          return 0;
      });
  }

  /**     filter  data   ***/
  function triDate (medias) {
      return medias.tri(function (a, b) {
          return new Date(a.date) - new Date(b.date);
      });
  }
  document.querySelector(".sectionTrier").innerHTML = mediasParType;
}