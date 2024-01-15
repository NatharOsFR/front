<body>
  <div id="loader" class="loader">
      <div class="loader-inner"></div>
  </div>
  <script src="/src/js/chargement.js" defer></script>
  <script src="/src/js/redirection.js" defer></script>
  <script>const nickname = "<?php echo $nickname; ?>";
  </script>
  
  <div class="container-center">
      <div class="profile-container">
          <form id="profileForm" enctype="multipart/form-data">
              <div class="profile-block">
                  <img class="profile-image" id="profile-image" src="includes/humain.png" alt="Image de profil">
                  <div class="profil-left">
                      <div class="profile-info">
                          <h2 id="profile-username"></h2>
                          <p id="profile-age">25 ans</p>
                          <img id="profile-img" style="width: 20%; height: 20%;" ></img>
                      </div>
                      <div class="bio">
                          <p class="bio-label">Biographie:</p>
                          <p id="profile-bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      </div>
                  </div>
                  <div class="profil-right">
                      <div class="profile-stats">
                          <p>2 posts</p>
                          <p>138 abonnés</p>
                          <p>230 abonnements</p>
                      </div>
                      <div class="Monney"  style="visibility: hidden;">
                          <div class="Coins">Matrice Coins: 0</div>
                          <img src="includes/MatriceCoin.png" class="ImgCoins">
                      </div>
                      <button type="button" class="subscribe-button" id="subscribe-button" >S'abonner</button>
                  </div>
              </div>
          </form>
      </div>
  </div>

  <div class="container mt-5 mb-5">
      <div id="cardContainer" class="postProfil row">
      </div>

      <button class="fixed-button"><a class="nav-link lienPost <?php if($menu['page'] == "creationPost") echo "active" ?>" aria-current="page" href="?url=creationPost">+ Nouveau post</a></button>
  </div>

    <div id="buyConfirmationDialog" class="confirmation-dialog">
    <div class="dialog-content">
        <p>Voulez-vous vraiment acheter ce post ?</p>
        <button id="confirmBuy">Valider</button>
        <button id="cancelBuy">Annuler</button>
      </div>
    </div>
  <script src="/src/js/script-subscribe.js" defer></script> 
  <script src="/src/js/script-post-user.js" defer></script>

</body>
