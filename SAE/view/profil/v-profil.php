<body>
    <div class="container-center">
      <div class="profile-container">
        <div class="profile-block">
          <img class="profile-image" id="profile-image" src="includes/humain.png" alt="Image de profil">
            <div class="profil-left">
                <div class="profile-info">
                    <h2>Damien_14</h2>
                    <p>25 ans</p>
                </div>
                <div class="bio">
                    <p class="bio-label">Biographie:</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
            </div>
            <div class="profil-right">
                <div class="profile-stats">
                    <p>2 posts</p>
                    <p>138 abonnés</p>
                    <p>230 abonnements</p>
                </div>
                <div class="Coins">Matrice Coins: 300<img src="includes/MatriceCoin.png" class="ImgCoins"> </div>
                <button class="edit-profile-button" id="edit-profile">Modifier le profil</button>
            </div>
        </div>
    </div>
  </div>
  <div class="container mt-5 mb-5">
    <div id="cardContainer" class="postProfil">
    </div>
    <button class="fixed-button" ><a class="nav-link lienPost <?php if($menu['page'] == "creationPost") echo "active" ?>" aria-current="page" href="?url=creationPost">+ Nouveau post</a></button>
  </div>
<script src="/src/js/script-modifProfil.js" defer></script>
<script src="/src/js/script-post.js" defer></script>
</body>