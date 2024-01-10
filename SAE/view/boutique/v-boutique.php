<body>
  <div id="loader" class="loader">
      <div class="loader-inner"></div>
  </div>
  <script src="/src/js/chargement.js" defer></script>
  <script src="/src/js/redirection.js" defer></script>
  
  <h3 class="titreBoutique">Boutique MatriceCoins</h3>
  <div class="ContainerMonney">
    <div class="MonneyBoutique">
      <div class="Coins">Matrice Coins: 300</div>
      <img src="includes/MatriceCoin.png" class="ImgCoinsBoutique">
    </div>
  </div>
  <div class="container-boutique">
    <div class="grande-case">
        <div class="ligneBoutique">
            <div class="caseBoutique">
              <div class="caseBInterne" id="Novice"><img src="includes/Rang1.png" class="imgPostMoneyBoutique"> Novice </div>
              <span>500<img src="includes/MatriceCoin.png" class="MatriceCoin"></span>
            </div>
            <div class="caseBoutique">
              <div class="caseBInterne" id="Explorateur"><img src="includes/Rang2.png" class="imgPostMoneyBoutique">Explorateur</div>
              <span>1000<img src="includes/MatriceCoin.png" class="MatriceCoin"></span>
            </div>
            <div class="caseBoutique" id="Connaisseur">
              <div class="caseBInterne"><img src="includes/Rang3.png" class="imgPostMoneyBoutique">   Connaisseur</div>
              <span>2000<img src="includes/MatriceCoin.png" class="MatriceCoin"></span>
            </div>
        </div>
        <div class="ligneBoutique">
            <div class="caseBoutique" id="Influenceur">
              <div class="caseBInterne"><img src="includes/Rang4.png" class="imgPostMoneyBoutique">Influenceur</div>
              <span>10 000<img src="includes/MatriceCoin.png" class="MatriceCoin"></span>
            </div>
            <div class="caseBoutique" id="Maestro">
              <div class="caseBInterne"><img src="includes/Rang5.png" class="imgPostMoneyBoutique"> Maestro</div>
              <span>35 000<img src="includes/MatriceCoin.png" class="MatriceCoin"></span>
            </div>
            <div class="caseBoutique" id="Hype">
              <div class="caseBInterne"><img src="includes/Rang6.png" class="imgPostMoneyBoutique"> Hype</div>
              <span>100 000<img src="includes/MatriceCoin.png" class="MatriceCoin"></span>
            </div>
        </div>
    </div>
    
  </div> 
  <button class="fixed-button" ><a class="nav-link lienPost <?php if($menu['page'] == "creationPost") echo "active" ?>" aria-current="page" href="?url=creationPost">+ Nouveau post</a></button>
  <script src="/src/js/script-boutique.js" defer></script>
</body>