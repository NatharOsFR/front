

<header>

  <nav class="navbar  navbar-expand-lg  navbar-dark">
    <div id="mySidenav" class="sidenav">
      <a id="closeBtn"  class="close">×</a>
      <ul>
        <div class="navHover">
        <li><a href="?url=profil">Profil</a></li>
        <li><a href="?url=abonnements">Abonnements</a></li>
        <li><a href="?url=abonnes">Abonnés</a></li>
        <li><a href="?url=compte">Compte</a></li>
        <li><a href="?url=mentionLegales">Mentions légales</a></li>
        </div>
        <li><a>
        <input id="searchbar"  type="text"
            name="search" placeholder="Chercher"></a></li>
        <li><div id="searchResultsContainer"></div></a></li>
      </ul>
      </ul>
      
    </div>

    <a id="openBtn">
      <span class="burger-icon">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </a>
      <div class="container">
          <div class="navbar-brand">
            <a class="logo" href="?url=accueil" >
               <img src="/includes/MatriceLogo.png" width="8%" height="8%" alt=""> 
            </a>
          </div>
      </div>
    <div class="header-buttons">
      <a class="nav-link <?php if($menu['page'] == "accueil") echo "active" ?>" aria-current="page" href="?url=accueil">
      <button class="rounded-button">Accueil</button> </a>
      <a class="nav-link <?php if($menu['page'] == "boutique") echo "active" ?>" aria-current="page" href="?url=boutique">
      <button class="rounded-button" ><span class="fa-solid fa-cart-shopping fa-bounce"></span>ㅤBoutique</button></a>
      <a id="connexionButton" class="nav-link <?php if($menu['page'] == "connexion") echo "active" ?>" aria-current="page" href="?url=connexion">
       <button class="rounded-button connexionBouton">Connexion/Inscription</button></a>
      

    </div>
  </nav>
  <script src="https://cdn.socket.io/4.0.1/socket.io.min.js"></script>
  <script src="/src/socketClient.js" defer></script>
  <script src="/src/js/script-search.js" defer></script>
  <script src="/src/js/script-burger.js" defer></script>
  <script src="/src/js/header-script.js" defer></script>
</header>