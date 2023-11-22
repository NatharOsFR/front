   // Récupérez les éléments du DOM nécessaires
    const editButton = document.getElementById("edit-profile");
    const profileInfo = document.querySelector(".profile-info");
    const bio = document.querySelector(".bio");

// Fonction pour activer la modification du profil
function enableProfileEditing() {
    
    const bioInput = document.createElement("textarea");
    bioInput.value = bio.querySelector("p:last-child").textContent;
    bioInput.setAttribute("maxlength", "250");

    // Ajoutez un élément d'entrée de type 'file' pour l'image de profil
    const profileImageInput = document.createElement("input");
    profileImageInput.type = "file";
    profileImageInput.accept = "image/*"; // Accepte uniquement les fichiers image

  // Ajoutez un gestionnaire d'événement pour surveiller les changements de fichier
    profileImageInput.addEventListener("change", function () {
        const selectedImage = profileImageInput.files[0];
        if (selectedImage) {
            const reader = new FileReader();
            reader.onload = function (e) {
                // Mise à jour de l'attribut src de l'image de profil avec la nouvelle URL
                const profileImage = document.getElementById("profile-image");
                profileImage.src = e.target.result;
            };
            reader.readAsDataURL(selectedImage);
        }
    });

  
    bio.innerHTML = "";
    bio.appendChild(bioInput);

    // Ajoutez l'élément d'entrée pour l'image de profil
    bio.appendChild(profileImageInput);

    // Change le texte du bouton
    editButton.textContent = "Enregistrer les modifications";

    // Ajoutez un gestionnaire d'événement pour enregistrer les modifications
    editButton.removeEventListener("click", enableProfileEditing);
    editButton.addEventListener("click", saveProfileChanges);
}

// Fonction pour sauvegarder les modifications du profil
function saveProfileChanges() {

    const newBio = bio.querySelector("textarea").value;

    // Récupérez le fichier image de profil
    const profileImageInput = bio.querySelector("input[type='file']");
    const newProfileImage = profileImageInput.files[0]; // Le premier fichier sélectionné

    bio.innerHTML = `<p class="bio-label">Biographie:</p><p>${newBio}</p>`;

    // Change le texte du bouton
    editButton.textContent = "Modifier le profil";

    // Ajoutez un gestionnaire d'événement pour activer la modification
    editButton.removeEventListener("click", saveProfileChanges);
    editButton.addEventListener("click", enableProfileEditing);

  // Si un nouveau fichier image a été choisi, vous pouvez gérer son chargement ici
  if (newProfileImage) {
      const reader = new FileReader();
      reader.onload = function (e) {
          // `e.target.result` contient l'URL de la nouvelle image
          // Vous pouvez l'utiliser pour afficher la nouvelle image sur la page
          const newImageUrl = e.target.result;

          // Mettez à jour l'attribut src de l'image de profil avec la nouvelle URL
          const profileImage = document.getElementById("profile-image");
          profileImage.src = newImageUrl;
      };
      reader.readAsDataURL(newProfileImage); // Chargez le fichier image
  }
}

    // Ajoutez un gestionnaire d'événement pour activer la modification au clic
    editButton.addEventListener("click", enableProfileEditing);
