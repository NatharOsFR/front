const toggleSwitch = document.getElementById("toggle");
const toggleLabel = document.querySelector(".post-toggle-label span");

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
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = "block";
        };
        reader.readAsDataURL(input.files[0]);
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
      tagsList.add(tagText); // Ajouter le tag au Set des tags uniques
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
  if (e.target.classList.contains('tag')) {
    const removedTag = e.target.textContent;
    tagsList.delete(removedTag); // Retirer le tag du Set des tags uniques
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
