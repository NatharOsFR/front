const toggleSwitch = document.getElementById("toggle");
const toggleLabel = document.querySelector(".post-toggle-label span");



  document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la soumission normale du formulaire

    // Récupérer les données du formulaire
    const description = document.getElementById('description').value;
    const formData = new FormData(event.target);
    const tags = Array.from(tagsContainer.querySelectorAll('.tag')).map(tag => tag.textContent);
    const buy = document.getElementById('toggle').checked;


    // Appeler la fonction createPost avec les données et l'objet event
    createPost(description, formData,tags,buy);
  });

  async function createPost(description, formData, tags,buy) {
    ChargementCreationPost();
    try {
        console.log('Valeur de la description dans createPost:', description);

        // Envoyer la requête avec les données du formulaire
        const response = await fetch('src/ImagesImgur.php', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`La requête a échoué avec le statut ${response.status}`);
        }

        // Récupérer le lien Imgur
        const imgurLink = await response.text();

        console.log('Imgur Link:', imgurLink);

        // Appeler la fonction create avec les données nécessaires
        create(description, imgurLink,tags,buy);
    } catch (error) {
        console.error('Erreur lors de la récupération du lien Imgur', error);
    }
  }

  function create(description, imgurLink,tags,buy) {
    // Utiliser description et imgurLink pour créer les données nécessaires
    

    const data = {
        motherId: null,
        picture: imgurLink,
        description,
        tags, 
        buy,
        token,
    };

    console.log(data);

    // Émission de l'événement 'createPost' vers le serveur
    socket.emit('createPost', data);

    // Écoute de l'événement 'reponsecreatePost' une seule fois
    socket.once('reponsecreatePost', (response) => {
        console.log('Réponse du serveur (createPost):', response);

        // Vérification du code de retour
        if (response.statusCode === 200) {
            console.log('Le post a été créé avec succès.');

            // Afficher un message de succès à l'utilisateur
            alert('Post créé avec succès !');
            // Rediriger l'utilisateur ou effectuer d'autres actions après la création réussie du post
            window.location.href = "https://mortifiedenchantingmenu.ni0de0.repl.co";
        } else if (response.statusCode === 400) {
            console.error('La création du post a échoué. Erreur côté client:', response.message);
            // Afficher un message d'erreur à l'utilisateur
            alert('Erreur lors de la création du post. Veuillez vérifier vos informations.');
        } else {
            console.warn('Code de statut inattendu:', response.statusCode);
            // Afficher un message d'erreur générique à l'utilisateur
            alert('Erreur inattendue lors de la création du post. Veuillez réessayer.');
        }
    });
}



toggleSwitch.addEventListener("change", () => {
  if (toggleSwitch.checked) {
    toggleLabel.textContent = "Achetable";
  } else {
    toggleLabel.textContent = "Non-achetable";
  }
});


function previewImage(input) {
    const imagePreview = document.getElementById("image-preview");

    if (input.files && input.files[0]) {
        const file = input.files[0];

        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = function () {
            if (img.width > 2 * img.height || img.height > 2 * img.width) {
                alert("Les dimensions de l'image sont trop grandes. Veuillez sélectionner une image plus petite.");
                input.value = '';
                imagePreview.style.display = "none";
            } else {
                const reader = new FileReader();
                reader.onload = function (e) {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = "block";
                };
                reader.readAsDataURL(file);
            }
        };
    } else {
        imagePreview.style.display = "none";
    }
}


const showLabelButton = document.getElementById("show-label");
const label = document.getElementById("tags");

showLabelButton.addEventListener("click", () => {
  label.style.display = "block";
});


const tagsInput = document.getElementById('tags');
const tagsContainer = document.querySelector('.tags-input');
const maxTags = 5; // Limite de 5 tags
const tagsList = new Set(); // Utiliser un Set pour stocker les tags uniques

tagsInput.addEventListener('input', function (e) {
  const tagText = tagsInput.value.trim(); // Supprimer les espaces en trop
  if (e.inputType === 'insertText' && (e.data === ' ' || e.data === ',')) {
    if (tagText) {
      if (tagsList.has(tagText)) {
        // Le tag existe déjà, supprimer la dernière case et l'espace ajouté
        tagsInput.value = tagsInput.value.slice(0, -2);
        return;
      }
      addTag(tagText);
    }
  }
});

tagsInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    const tagText = tagsInput.value.trim(); // Supprimer les espaces en trop
    if (tagText) {
      if (tagsList.has(tagText)) {
        // Le tag existe déjà, supprimer la dernière case et l'espace ajouté
        tagsInput.value = tagsInput.value.slice(0, -2);
        return;
      }
      addTag(tagText);
    }
  }
});

function addTag(tagText) {
  if (tagsContainer.querySelectorAll('.tag').length < maxTags) {
    if (tagsList.size < maxTags && !tagsList.has(tagText)) {
      tagsList.add(tagText); 
      const tag = document.createElement('div');
      tag.className = 'tag';
      tag.textContent = tagText;
      tagsContainer.insertBefore(tag, tagsInput);
      tagsInput.value = '';
      label.style.display = "none";
      if(tagsList.size == maxTags){
         showLabelButton.style.display = "none";
      }
      
    } else {
      // Afficher un message d'erreur si le tag est en double ou si la limite est atteinte
      console.log('Limite de tags atteinte (5 tags maximum) ou tag en double.');
    }
  } else {
    // Vous pouvez afficher un message d'erreur ou prendre d'autres mesures
    console.log('Limite de tags atteinte (5 tags maximum)');
  }
}

tagsContainer.addEventListener('click', function (e) {
  const tagsInput = document.getElementById("tags");
  if (tagsInput) {
    tagsInput.focus();
  }
  if (e.target.classList.contains('tag')) {
    const removedTag = e.target.textContent;
    tagsList.delete(removedTag);
    e.target.remove();
    showLabelButton.style.display = "block";
  }
  
});







document.getElementById("toggle").addEventListener("change", function() {
  if (this.checked) {
    // Le bouton est activé (ON)
    console.log("ON");
  } else {
    // Le bouton est désactivé (OFF)
    console.log("OFF");
  }
});
