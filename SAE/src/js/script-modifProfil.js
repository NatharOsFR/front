////Affichage Profil 


console.log(token)
document.addEventListener('DOMContentLoaded', () => {
  // Get the token from the cookie

  // Check if the token is present
  if (token) {

    // Emit an event to request profile data
    socket.emit('getProfileData', { token });

    // Listen for the response event
    socket.on('reponsegetProfileData', (profileData) => {
      console.log(profileData);
      // Update the profile information on the page
      updateProfileData(profileData);
    });
  }
});



// Function to update the profile data on the page
function updateProfileData(profileData) {
  const usernameElement = document.getElementById('profile-username');
  const rank = profileData.response.rank;
  const imgElement = document.getElementById('profile-img');

  switch (rank) {
    case 1:
      imgElement.src = "includes/Rang1.png";
      break;

    case 2:
      imgElement.src = "includes/Rang2.png";
      break;

    case 3:
      imgElement.src = "includes/Rang3.png";
      break;

    case 4:
      imgElement.src = "includes/Rang4.png";
      break;
      
    case 5:
      imgElement.src = "includes/Rang5.png";
      break;
      
    case 6:
      imgElement.src = 'includes/Rang6.png';
      break;
      
    default:
      usernameElement.textContent = "Rang inconnu";
      break;
  }

  // Vérifiez si le nickname n'est pas vide et s'il commence par une lettre
  if (profileData.response.nickname && /^[a-zA-Z]/.test(profileData.response.nickname)) {
      // Mettez la première lettre en majuscule
      const capitalizedNickname = profileData.response.nickname.charAt(0).toUpperCase() + profileData.response.nickname.slice(1);
      usernameElement.innerText = capitalizedNickname;
  } else {
      // Le nickname est vide ou ne commence pas par une lettre, utilisez-le tel quel
      usernameElement.innerText = profileData.response.nickname;
  }
  document.getElementById('profile-image').src = profileData.response.picture;
  document.getElementById('profile-age').innerText = `${calculateAge(profileData.response.birthday)} ans`;
  document.getElementById('profile-bio').innerText = profileData.response.bio || 'Aucune biographie disponible';
  document.querySelector('.profile-stats p:nth-child(1)').innerText = `${profileData.response.posts} posts`;
  document.querySelector('.profile-stats p:nth-child(2)').innerText = `${profileData.response.subscribes} abonnés`;
  document.querySelector('.profile-stats p:nth-child(3)').innerText = `${profileData.response.subscribed} abonnements`;
  document.querySelector('.Coins').innerText = `Matrice Coins: ${profileData.response.coins} `;
}

// Function to calculate age from birthday
function calculateAge(birthday) {
  const birthDate = new Date(birthday);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  return age;
}

// Fonction pour activer la modification du profil
function enableProfileEditing() {
    // Récupérer les éléments nécessaires
    const bio = document.querySelector(".bio");
    const bioLabel = document.querySelector('.bio-label');
    const editButton = document.getElementById("edit-profile");

    // Vérifier si bioLabel existe
    if (!bioLabel) {
        console.error("L'élément bioLabel n'a pas été trouvé.");
        return;
    }

    // Récupérer l'élément bio à partir de bioLabel
    const bioInput = document.createElement("textarea");
    bioInput.value = bioLabel.nextElementSibling.textContent;
    bioInput.setAttribute("maxlength", "250");

    // Ajouter l'ID "profile-bio"
    bioInput.id = "profile-bio";

    // Créer un élément input de type file pour l'image de profil
    const profileImageInput = document.createElement("input");
    profileImageInput.type = "file";
    profileImageInput.accept = "image/*";

   
  profileImageInput.addEventListener("change", function () {
      const selectedImage = profileImageInput.files[0];
      const maxFileSize = 2 * 1024 * 1024;

      if (selectedImage) {
          // Vérification de la taille du fichier
          if (selectedImage.size > maxFileSize) {
              alert("La taille du fichier est trop grande. Veuillez sélectionner un fichier plus petit.");
              profileImageInput.value = '';
              return;
          }

          const img = new Image();
          img.src = URL.createObjectURL(selectedImage);

          img.onload = function () {
              if (img.width > 2 * img.height || img.height > 2 * img.width) {
                  alert("Les dimensions de l'image sont trop grandes. Veuillez sélectionner une image plus petite.");
                  profileImageInput.value = '';
              } else {
                  const reader = new FileReader();
                  reader.onload = function (e) {
                      const profileImage = document.getElementById("profile-image");
                      profileImage.src = e.target.result;
                  };
                  reader.readAsDataURL(selectedImage);
              }
          };
      }
  });

    // Ajouter les éléments créés à l'élément bio
    bio.innerHTML = ""; // Supprimer le contenu existant
    bio.appendChild(bioInput);
    bio.appendChild(profileImageInput);

    // Mettre à jour le texte du bouton
    editButton.textContent = "Enregistrer les modifications";

    // Ajouter un gestionnaire d'événement pour sauvegarder les modifications
    editButton.removeEventListener("click", enableProfileEditing);
    editButton.addEventListener("click", saveAndEnable);
}

// Fonction pour valider que la bio n'est pas vide
function validateBio(bio) {
    const nonSpaceRegex = /\S/;
    return nonSpaceRegex.test(bio);
}


// Fonction pour créer un nouveau post et retourner le lien Imgur
async function createPost(formData) {
  try {
    const response = await fetch('src/ImagesImgur.php', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`La requête a échoué avec le statut ${response.status}`);
    }

    const imgurLink = await response.text();

    console.log('Imgur Link:', imgurLink);

    return imgurLink;
  } catch (error) {
    console.error('Erreur lors de la récupération du lien Imgur', error);
    throw error; // Répétez l'erreur pour la gérer dans la fonction appelante si nécessaire
  }
}





// Fonction pour sauvegarder les modifications du profil et activer l'édition si la bio est valide
async function saveAndEnable() {
  // Récupérer les éléments nécessaires
  const bio = document.querySelector(".bio");
  const bioInput = bio.querySelector("textarea");
  const editButton = document.getElementById("edit-profile");

  // Récupérer la nouvelle bio et l'image de profil
  const newBio = bioInput.value.trim();
  const profileImageInput = bio.querySelector("input[type='file']");
  const newProfileImage = profileImageInput.files[0];

  // Valider que la bio n'est pas vide
  if (!validateBio(newBio)) {
    // Afficher un message à l'utilisateur
    alert("La bio ne peut pas être vide. Veuillez ajouter du contenu.");
    return;
  }

  try {
    let imgurLink = null;

    // Vérifier si une nouvelle image a été choisie
    if (newProfileImage) {
      // Récupérer le formulaire de l'image de profil
      const profileImageForm = new FormData();
      profileImageForm.append('image', newProfileImage);

      // Appeler la fonction createPost pour obtenir le lien Imgur
      imgurLink = await createPost(profileImageForm);

      // Gérer le chargement de la nouvelle image de profil
      const reader = new FileReader();
      reader.onload = function (e) {
        const newImageUrl = e.target.result;
        const profileImage = document.getElementById("profile-image");
        profileImage.src = newImageUrl;
      };
      reader.readAsDataURL(newProfileImage);
    }

    // Mettre à jour le contenu de la bio
    bio.innerHTML = `<p class="bio-label">Biographie:</p><p>${newBio}</p>`;

    // Mettre à jour le texte du bouton
    editButton.textContent = "Modifier le profil";

    // Ajouter un gestionnaire d'événement pour activer la modification
    editButton.removeEventListener("click", saveAndEnable);
    editButton.addEventListener("click", enableProfileEditing);

    // Enregistrer les modifications sur le serveur
    const data = {
      picture: imgurLink,
      bio: newBio,
      token: token,
    };

    // Émettre l'événement 'updateProfil' vers le serveur
    socket.emit('updateProfil', data);
    console.log(data);

    // Écouter l'événement 'reponseAPI' une seule fois
    socket.once('reponseupdateProfil', (response) => {
      console.log('Réponse du serveur (modifyProfile):', response);

      // Vérifier le code de retour
      if (response.statusCode === 200) {
        console.log('Le profil a été modifié avec succès.');

        // Afficher un message de succès à l'utilisateur
        alert('Profil modifié avec succès !');

        // Vous pouvez rediriger l'utilisateur ou effectuer d'autres actions après la modification réussie du profil
      } else if (response.statusCode === 400) {
        console.error('La modification du profil a échoué. Erreur côté client:', response.message);
        // Afficher un message d'erreur à l'utilisateur
        alert('Erreur lors de la modification du profil. Veuillez vérifier vos informations.');
      } else {
        console.warn('Code de statut inattendu:', response.statusCode);
        // Afficher un message d'erreur générique à l'utilisateur
        alert('Erreur inattendue lors de la modification du profil. Veuillez réessayer.');
      }
    });

  } catch (error) {
    // Gérer les erreurs ici
    console.error('Erreur lors de la modification du profil :', error);
    alert('Erreur lors de la modification du profil. Veuillez réessayer.');
  }
}



// Ajouter un gestionnaire d'événement pour activer la modification au clic
const editButton = document.getElementById("edit-profile");
if (editButton) {
    editButton.addEventListener("click", enableProfileEditing);
}

