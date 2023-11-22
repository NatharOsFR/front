const connexionButton = document.getElementById("connexionButton");
const inscriptionButton = document.getElementById("inscriptionButton");
const formConnexion = document.getElementById("formConnexion");
const formInscription = document.getElementById("formInscription");
const confirmationMotDePasse = document.getElementById("confirmationMotDePasse");
const motDePasseInscription = document.getElementById("motDePasseInscription");




function redirectionApresSoumission() {
    // Effectuez votre redirection ici
    window.location.href = "https://mortifiedenchantingmenu.ni0de0.repl.co";
    // Assurez-vous de retourner false pour empêcher l'envoi du formulaire par défaut
}

async function creationUser(event) {
    event.preventDefault();

    const nickname = document.getElementById('pseudo').value;
    const email = document.getElementById('emailInscription').value;
    const password = document.getElementById('motDePasseInscription').value;
    const lastname = document.getElementById('nom').value;
    const firstname = document.getElementById('prenom').value;
    const birthday = document.getElementById('dateNaissance').value;

    const data = {
        nickname,
        mail: email,
        password,
        lastname,
        firstname,
        birthday
    };
  socket.emit('creationUser', data);
};

  // Émission de l'événement 'creationUser' vers le serveur

// Écoute de l'événement 'reponseAPI'
socket.on('reponseAPI', (response) => {
  console.log('Réponse du serveur:', response);

  // Vérification du code de retour
  if (response.statusCode === 200) {
    console.log('La requête a été traitée avec succès.');
    // Afficher un message de succès à l'utilisateur
    alert('Inscription réussie !');
  } else if (response.statusCode === 400) {
    console.error('La requête a échoué. Erreur côté client:', response.message);
    // Afficher un message d'erreur à l'utilisateur
    alert('Erreur lors de l\'inscription. Veuillez vérifier vos informations.');
  } else {
    console.warn('Code de statut inattendu:', response.statusCode);
    // Afficher un message d'erreur générique à l'utilisateur
    alert('Erreur inattendue lors de l\'inscription. Veuillez réessayer.');
  }
});








connexionButton.addEventListener("click", () => {
    formConnexion.style.display = "block";
    formInscription.style.display = "none";
});

inscriptionButton.addEventListener("click", () => {
    formConnexion.style.display = "none";
    formInscription.style.display = "flex";
    
});




var form = document.getElementById('formInscription');
var progressBar = document.getElementById('progressBar');

var updateColor = function(progressPercentage) {
    if (progressPercentage < 1/3*100) {
        progressBar.style.backgroundColor = '#ff0000'; // Rouge
    } else if (progressPercentage < 2/3*100) {
        progressBar.style.backgroundColor = '#ff8000'; // Orange
    } else if (progressPercentage < 3/3*100) {
        progressBar.style.backgroundColor = '#ffcc00'; // Jaune
    } else {
        progressBar.style.backgroundColor = '#33cc33'; // Vert
    }
};


function changerStyleBouton(bouton, autreBoutonId) {
    bouton.classList.add('active');
    bouton.classList.remove('disabled');

    const autreBouton = document.getElementById(autreBoutonId);
    autreBouton.classList.remove('active');
    autreBouton.classList.add('disabled');
}

function validateDate() {
    var inputDate = document.getElementById('dateNaissance').value;
    var selectedDate = new Date(inputDate);
    var currentDate = new Date();
    var limitDate = new Date('1920-01-01');

    if (selectedDate < limitDate || selectedDate > currentDate) {
        alert("La date doit être postérieure à 1920-01-01 et antérieure à la date actuelle.");
        document.getElementById('dateNaissance').value = '';
        updateProgressBar()
        return false; 
    }

    return true; 
}
// Fonction pour vérifier la correspondance des champs du mot de passe et de confirmation du mot de passe
function verifierCorrespondanceMotDePasse() {
    // Vérifiez la correspondance des mots de passe avant de soumettre le formulaire
    var motDePasse = document.getElementById("motDePasseInscription").value;
    var confirmationMotDePasse = document.getElementById("confirmationMotDePasse").value;

    if (motDePasse !== confirmationMotDePasse) {
        alert("Les mots de passe ne correspondent pas.");
        return false; // Annule la soumission du formulaire
    }

    return true; // Autorise la soumission du formulaire
}

function validerFormulaire() {
    if (!verifierCorrespondanceMotDePasse() || !validateDate() || !creationUser(event)) {
        return false; // Annule la soumission du formulaire
    }

    return true; // Autorise la soumission du formulaire
}

form.addEventListener('input', updateProgressBar);

// Ajoute des gestionnaires d'événements pour la saisie dans les champs de mot de passe et de confirmation du mot de passe

document.getElementById("confirmationMotDePasse").addEventListener("blur", verifierCorrespondanceMotDePasse);





function updateProgressBar() {
    var filledFields = form.querySelectorAll('input:required').length - 
        form.querySelectorAll('input:required:invalid').length;

    var motDePasse = document.getElementById("motDePasseInscription").value;
    var confirmationMotDePasseInput = document.getElementById("confirmationMotDePasse");
    var confirmationMotDePasse = confirmationMotDePasseInput.value;

    // Assurez-vous que le champ de confirmation du mot de passe est valide
    if (confirmationMotDePasseInput.checkValidity()) {
        // Si les champs de confirmation du mot de passe ne correspondent pas, décrémentez filledFields
        if (motDePasse !== confirmationMotDePasse) {
            filledFields--;
        }
    }

    var totalFields = form.querySelectorAll('input[required]').length;
    var progressPercentage = (filledFields / totalFields) * 100;
    progressBar.style.width = progressPercentage + '%';
    updateColor(progressPercentage);
}

