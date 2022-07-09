
//DOM
const modalBtn = document.querySelectorALL (".contact_button")
const modal = document.querySelectorALL (".contact_modal")
const modalFenetre = document.querySelectorALL (".modal")

// Evenement
modalBtn.forEach((btn) => btn.addEventListener("click", displayModal)); // Ouvrir au click
closebtn.forEach((btn) => btn.addEventListener("click", closeModal)); // Fermer la modale

// Form

function displayModal(id) {
    const modal = document.getElementsByClassName(".modal");
    modal.getElementById(id).style.display = "block";
    modal.innerHTML = 'div class="modal"'
}

function closeModal(id) {
    const modal = document.getElementsByClassName(".modal");
   modal.getElementById(id).style.display = "none";
}



