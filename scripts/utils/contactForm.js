
//DOM
const modalBtn = document.querySelectorALL ("contact_button")
const modal = document.querySelectorALL ("contact_modal")
const modalFenetre = document.querySelectorALL ("modal")

// Evenement
modalBtn.forEach((btn) => btn.addEventListener("click", displayModal)); // Ouvrir au click
closebtn.forEach((btn) => btn.addEventListener("click", closeModal)); // Fermer la modale

// Form

function displayModal() {
    const modal = document.getElementsByClassName("modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementsByClassName("modal");
    modal.style.display = "none";
}


