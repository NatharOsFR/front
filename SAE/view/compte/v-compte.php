<body>
  <div id="loader" class="loader">
      <div class="loader-inner"></div>
  </div>
  <script src="/src/js/chargement.js" defer></script>
  <script src="/src/js/redirection.js" defer></script>

  
  <div class="container-center">
    <h3 class="Compte">Compte</h3>
    <div class="compte-container">
      <div class="compte-block">
        <img class="compte-image" id="compte-image" src="" alt="Image de profil">
        <div class="compte-info">
          <div class="compte-left">
            <p id="compte-prenom">Prenom: <span id="prenom-placeholder">Test</span></p>
            <p id="compte-nom">Nom: <span id="nom-placeholder">Test</span></p>
            <p id="compte-datedenaissance">Date de naissance: <span id="date-de-naissance-placeholder">03/04/1995</span></p>
            <p id="compte-mail">Mail: <span id="mail-placeholder">test@test.gmail.com</span></p>
          </div>
          <form id="formMotdepasse" onsubmit="return ModifCorrespondanceMotDePasse();">
          <div class="compte-right">
            <label for="ancien-motdepasse">Ancien mot de passe:</label>
            <input type="password" id="old-password" name="old-password" required minlength="8" maxlength="20" pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$" title="Le mot de passe doit contenir au moins 8 caractères, 1 majuscule et 1 chiffre">
            
            <label for="nouveau-motdepasse">Nouveau mot de passe:</label>
            <input type="password" id="new-password" name="new-password" required minlength="8" maxlength="20" pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$" title="Le mot de passe doit contenir au moins 8 caractères, 1 majuscule et 1 chiffre">

            <label for="confirm-nouveau-motdepasse">Confirmer le nouveau mot de passe:</label>
            <input type="password" id="confirm-password" name="confirm-password" required minlength="8" maxlength="20" pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$" title="Le mot de passe doit contenir au moins 8 caractères, 1 majuscule et 1 chiffre">

            <input class="edit-motdepasse-button" id="updatePasswordButton" type="submit" value="Modifier le mot de passe">
          </div>
         </form>
        </div>
      </div>
    </div>
  </div>
  <button class="fixed-button" ><a class="nav-link lienPost <?php if($menu['page'] == "creationPost") echo "active" ?>" aria-current="page" href="?url=creationPost">+ Nouveau post</a></button>
  
  <script src="/src/js/Modifmotdepasse.js" defer></script>
</body>


      
          
            

