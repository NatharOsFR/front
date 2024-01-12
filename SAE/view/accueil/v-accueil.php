<body>
  <div id="loader" class="loader">
      <div class="loader-inner"></div>
  </div>
  <script src="/src/js/chargement.js" defer></script>
  
    <div class="container mt-5 mb-5">
        <div id="cardContainer" class="postAccueil">
        </div>
      <button class="fixed-button" ><a class="nav-link lienPost <?php if($menu['page'] == "creationPost") echo "active" ?>" aria-current="page" href="?url=creationPost">+ Nouveau post</a></button>
    </div>
  <script src="/src/js/script-thread.js" defer></script>
</body>
 
