<body>
  <div class="container-center">
    <div class="followers-container">
        <h3 class="followers-titre">Liste de contacts</h3>
        <ul class="followers-list">
            <li class="follower"><img src="includes/dl.png" class="imgHumain">Utilisateur 1</li>
            <li class="follower"><img src="includes/dl.png" class="imgHumain">Utilisateur 2</li>
            <li class="follower"><img src="includes/dl.png" class="imgHumain">Utilisateur 3</li>
            <!-- Ajoutez autant d'éléments li que nécessaire pour afficher la liste complète -->
        </ul>
    </div>
  </div>
  <button class="fixed-button" ><a class="nav-link lienPost <?php if($menu['page'] == "creationPost") echo "active" ?>" aria-current="page" href="?url=creationPost">+ Nouveau post</a></button>
</body>
