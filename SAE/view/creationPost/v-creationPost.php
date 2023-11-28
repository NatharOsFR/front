<body>
  <div id="loader" class="loader">
      <div class="loader-inner"></div>
  </div>
  <script src="/src/js/chargement.js" defer></script>
  <script src="/src/js/redirection.js" defer></script>
  
  <div class="post-form-container">
    <h3 class="titrePost">Création de Post</h3>
    <div class="post-form">
      <form id="postForm" method="post" enctype="multipart/form-data">
        <div class="creationPost">
        <div class="left-section">
          <label for="image" class="custom-file-label">Sélectionnez un fichier</label>
          <input type="file" id="image" name="image" accept="image/*" onchange="previewImage(this)" class="custom-file-input">
            
          <img id="image-preview" src="#" alt="Image prévisualisée" style="max-width: 100%; display: none;">
        </div>
        <div class="right-section">
          <label for="description">Description</label>
          <textarea id="description" name="description" rows="5" cols="50" maxlength="250" required></textarea>
          <label for="tags">Tags</label>
          <div class="tags-input">
            <input type="text" id="tags" name="tags" placeholder="Ajoutez des tags" style="display: none;">
            <img src="includes/plus.png" alt="" class="plus" id="show-label">
          </div>
          
          <label class="toggle-switch">
            <input type="checkbox" id="toggle">
            <span class="slider round"></span>
          </label>
          <label class="post-toggle-label">
            <span>Non-achetable</span>
          </label>
          <button class="post-form-button" type="submit">Publier</button>
        </div>
        </div>
      </form>
  </div>
  </div>
  <script src="/src/js/script-creationPost.js" defer></script>
</body>
  
