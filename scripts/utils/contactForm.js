
// DOM Elements
const modalbg = document.querySelector(".modal");
const modalBtn = document.querySelectorAll(".contact_button");
const formData = document.querySelectorAll(".formData");
const closebtn = document.querySelectorAll(".close"); // Fermer la modale



// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closebtn.forEach((btn) => btn.addEventListener("click", closeModal)); // Fermer la modale

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
function closeModal() {
  modalbg.style.display = "none"; // Fermer la modale
}

// FIN PARTIE DEJA PRESENTE //

// ------------------------------------------FORMULAIRE--------------------------------------------//

// Conditions regex 

const regex = {
  first: /^[a-zA-Z é è à -]{2,30}$/,
  last: /^[a-zA-Z é è à -]{2,30}$/,
  email: /^([a-z\d\./_-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,5})?$/,
  message: /^[a-zA-Z é è à -]{2,200}$/,
};


//Validation 

const modalBody = document.querySelector("modal");
const form = document.querySelector("form");

let First = 0;
let Last = 0;
let Email = 0;
let Message = 0;


// Test des champs 

function testFirst() {
  const prenom = document.getElementById('first').value;
  const p = document.getElementById('premier');  
  const p2 = document.getElementById('premier2');  

    if (regex.first.test(prenom)) {
      p.className = 'valid';
      p2.className = 'valid'; 
      let vert = document.getElementById('first');
      vert.className ="green"
      return First = 1;

    } else if (prenom.length < 2) {
        p2.className = 'invalid';  
        let rouge = document.getElementById('first');
        rouge.className ="red"
        return First = 0;    
    } else {
        p.className = 'invalid';  
        let rouge = document.getElementById('first');
        rouge.className ="red"
        return First = 0;    
  } 
  }

  function testLast() {
    const nom = document.getElementById('last').value;
    const p = document.getElementById('deuxieme');
    const p2 = document.getElementById('deuxieme2');  

    if (regex.last.test(nom)) {
      p.className = 'valid';
      p2.className = 'valid'; 
      let vert = document.getElementById('last');
      vert.className ="green"
      return Last = 1; 

    } else if (nom.length < 2) {
      p2.className = 'invalid';  
      let rouge = document.getElementById('last');
      rouge.className ="red"
      return First = 0;    
    } else {
      p.className = 'invalid';
      let rouge = document.getElementById('last');
      rouge.className ="red"
      return Last = 0;
    } 
  }
  
  function testEmail() {
    const mail = document.getElementById('email').value;
    const p = document.getElementById('troisieme');

    if (regex.email.test(mail)) {
      p.className = 'valid';
      let vert = document.getElementById('email');
      vert.className ="green"
      return Email = 1;  
    } else {
      p.className = 'invalid';
      let rouge = document.getElementById('email');
      rouge.className ="red"
      return Email = 0; 
    } 
  }

  function testMessage() {
    const message = document.getElementById('message').value;
    const p = document.getElementById('quatrieme');

    if (regex.message.test(message)) {
      p.className = 'valid';
      let vert = document.getElementById('message');
      vert.className ="green"
      return Message = 1;  
    } else {
      p.className = 'invalid';
      let rouge = document.getElementById('message');
      rouge.className ="red"
      return Message = 0;   
    } 
  }
  

// Validation du formulaire + modal Merci
function validation() {
  let sum = 0;

  testFirst();
  testLast();
  testEmail();
  testMessage();

  sum = First + Last + Email + Message;
  
  if (sum = 4) {
    modal.removeChild(form);
    modal.innerHTML = `<div class="innerContent">Merci pour <br> votre message</div><div class="contact_button" onclick="closeModal();">Fermer</div>`;
    return true;
  } else if (sum <= 4){
    return false;
  }

}