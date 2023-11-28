<body>
  <div id="loader" class="loader">
      <div class="loader-inner"></div>
  </div>
  <script src="/src/js/chargement.js" defer></script>
  
  <div class="form-container">
    <div class="sous-container">
    <div class="boutonsConnexionInscription">
      <button id="connexionButton" class="toggle-button active" onclick="changerStyleBouton(this, 'inscriptionButton')"">Connexion</button>
      <button id="inscriptionButton" class="toggle-button disabled" onclick="changerStyleBouton(this, 'connexionButton')"">Inscription</button>
    </div>
      <div class="form">
        <form id="formConnexion" onsubmit="return connexion(event);">
          <div class="TitreConnexion">
             <h3>Connexion</h3>
          </div>
            <label for="emailConnexion">Email</label>
          <input type="email" id="emailConnexion" name="emailConnexion" required maxlength="50" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Entrez une adresse e-mail valide.">
            <label for="motDePasseConnexion">Mot de passe</label>
          <input type="password" id="motDePasseConnexion" name="motDePasseConnexion" required minlength="8" maxlength="20" pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$" title="Le mot de passe doit contenir au moins 8 caractères, 1 majuscule et 1 chiffre">
           <div class="bouton">
            <input class="boutonConnexion" type="submit" value="Se connecter">
           </div>
        </form>

        <form id="formInscription" onsubmit="return validerFormulaire();">
          <div class="TitreInscription">
            <h3>Inscription</h3>
          </div>
          <div class="progress">
              <div id="progressBar"></div>
          </div>

          <div class="InscriptionBloc">
            <div class="InscriptionGauche">
                <label for="prenom">Prénom</label>
                <input type="text" id="prenom" name="prenom" maxlength="20" required>
                <label for="nom">Nom</label>
                <input type="text" id="nom" name="nom" maxlength="20" required>
                <label for="dateNaissance">Date de naissance</label>
                <input type="date" id="dateNaissance" name="dateNaissance" onblur="validateDate()" required>
                <label for="pseudo">Pseudo</label>
                <input type="text" id="pseudo" name="pseudo" maxlength="20" required>
            </div>

            <div class="InscriptionDroite">
                <label for="emailInscription">Email</label>
              <input type="text" id="emailInscription" name="emailInscription" required maxlength="50" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Entrez une adresse e-mail valide.">
                <label for="motDePasseInscription">Mot de passe</label>
                <input type="password" id="motDePasseInscription" name="motDePasseInscription" required minlength="8" maxlength="20" pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$" title="Le mot de passe doit contenir au moins 8 caractères, 1 majuscule et 1 chiffre">
                <label for="confirmationMotDePasse">Confirmation du mot de passe</label>
                <input type="password" id="confirmationMotDePasse" name="confirmationMotDePasse" required minlength="8" maxlength="20" pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$" title="Le mot de passe doit contenir au moins 8 caractères, 1 majuscule et 1 chiffre">
               <div class="bouton">
               <input class="boutonInscription" type="submit" value="S'inscrire">
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <script src="/src/js/script-connexion.js" defer></script>
</body>

