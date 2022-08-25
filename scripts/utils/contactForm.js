// DOM Elements
const modal = document.querySelector(".modal");
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".contact_button");
const formData = document.querySelectorAll(".formData");
const closebtn = document.querySelectorAll(".close"); 
const triggers = document.querySelectorAll('[aria-haspopup="dialog"]');
const doc = document.querySelector('.document');
const keyCodes = {
  enter: 13,
  escape: 27,
};

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closebtn.forEach((btn) => btn.addEventListener("click", closeModal)); // Fermer la modale


document.body.addEventListener('keypress', function(e) {
  if (e.key == "Escape") {
    alert("test");
    close(modal, modalbg);
  }
});


// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  modal.style.display = "block";
  doc.style.display = 'none';
  
}
function closeModal() {
  modalbg.style.display = "none"; 
  modal.style.display = "none"; 
  doc.style.display = 'block';// Fermer la modale
}

const inputs = document.querySelectorAll("input");
const textareas = document.querySelectorAll("textarea");

const validatedModal = (input) => {
  input.addEventListener("invalid", (e) => {
    // l evenement INVALID ajoute la class error si pas rempli
    e.preventDefault();
    if (!e.target.validity.valid) {
      //  ajoute le message d erreur sur le ou les input non remplis
      e.target.classList.add("red");
    }
  });
   
  input.addEventListener("input", (e) => {
    if (e.target.validity.valid) {
      // L evenement INPUT supprime  la class error ( si bien rempli)
      e.target.classList.remove("red");
      e.target.classList.add("green");
    }
  });
};

//  si la validation n'est pas ok , les class erreurs
Array.from(inputs).forEach(validatedModal);
Array.from(textareas).forEach(validatedModal);
// Affichage des elements remplis du formulaire de contact dans la console
const form = document.querySelector("form");

// e est ciblé sur le formulaire directement
form.addEventListener("submit", (e) => {
  e.preventDefault(); // permet envoi du  form au serveur
  // recupere avec e.target les valeurs
  
  console.log("Nom:", e.target.lastName.value); 
  console.log("Prénom:", e.target.firstName.value);
  console.log("Email:", e.target.email.value);
  console.log("Message:", e.target.message.value);

  document.getElementById("formulaire").style.display = "none";
  
  
});


