<body>
  <div id="loader" class="loader">
      <div class="loader-inner"></div>
  </div>
  <script src="/src/js/chargement.js" defer></script>
  <script src="/src/js/redirection.js" defer></script>
  <script>const postid = "<?php echo $postid; ?>";
  </script>
  <div class="containersolo">
    <div id="cardContainer" class="solocontainer">
    </div>
  </div>
  
  <div id="buyConfirmationDialog" class="confirmation-dialog">
      <div class="dialog-content">
          <p>Voulez-vous vraiment acheter ce post ?</p>
          <button id="confirmBuy">Valider</button>
          <button id="cancelBuy">Annuler</button>
      </div>
  </div>
  <script src="/src/js/post-unique.js" defer></script>
</body>