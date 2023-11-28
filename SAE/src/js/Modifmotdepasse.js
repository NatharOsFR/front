function ModifCorrespondanceMotDePasse() {
    // Vérifiez la correspondance des mots de passe avant de soumettre le formulaire
    var motDePasse = document.getElementById("new-password").value;
    var confirmationMotDePasse = document.getElementById("confirm-password").value;

    if (motDePasse !== confirmationMotDePasse) {
        alert("Les mots de passe ne correspondent pas.");
        return false; // Annule la soumission du formulaire
    }

    return true; // Autorise la soumission du formulaire
}

// Fonction pour formater une date au format "DD/MM/YYYY"
function formatDate(dateString) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString('fr-FR', options);
  return formattedDate;
}

// Supprimez les fonctions ModifCorrespondanceMotDePasse et updateAccountPage si vous ne les utilisez plus
function updateAccountPage(accountData) {
  // Mettez à jour les éléments de la page avec les nouvelles données du compte
  document.getElementById('prenom-placeholder').innerText = accountData.firstname;
  document.getElementById('nom-placeholder').innerText = accountData.lastname;
  document.getElementById('date-de-naissance-placeholder').innerText = formatDate(accountData.birthday);
  document.getElementById('mail-placeholder').innerText = accountData.mail;
  document.getElementById('compte-image').src = accountData.picture || "https://i.imgur.com/giD9E4i.png";
  
}

// Fonction pour récupérer la valeur d'un cookie par son nom
function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : null;
}

document.addEventListener('DOMContentLoaded', () => {
  if (!ModifCorrespondanceMotDePasse())
    return false
  const token = getCookie('token')
  
  
  socket.emit('getProfileData',{token})
  // Utilisez la fonction updateAccountPage avec les données du socket
  socket.on('reponsegetProfileData', (response) => {
    const accountData = response.response;
    updateAccountPage(accountData);
  });
});



//Socket JavaScript côté client
const updatePasswordButton = document.getElementById('updatePasswordButton');

updatePasswordButton.addEventListener('click', () => {
    // Obtenez les valeurs actuelles et les nouvelles du formulaire
  event.preventDefault();
    const oldPassword = document.getElementById('old-password').value;
    const newPassword = document.getElementById('new-password').value;

    // Vous devez également avoir l'ID de l'utilisateur, que vous pouvez obtenir lors de la connexion
    const token = getCookie('token'); // Remplacez par l'ID de l'utilisateur
    // Utilisez le socket pour émettre l'événement de mise à jour du mot de passe
    socket.emit('changePassword', { password: oldPassword, newpassword : newPassword,token });
    // Écoutez la réponse du serveur
    socket.once('reponsechangePassword', (response) => {
        if (response.statusCode===200) {
            alert('Mot de passe mis à jour avec succès');
            // Supprimez le token du cookie
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

            // Redirigez l'utilisateur vers la page de connexion
            window.location.href = 'https://mortifiedenchantingmenu.ni0de0.repl.co/?url=connexion'; // Remplacez '/login' par le chemin de votre page de connexion
        } else {
            alert(`Échec de la mise à jour du mot de passe : ${response.response}`);
        }
    });
});
