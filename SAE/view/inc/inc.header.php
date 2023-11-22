

<header>

  <nav class="navbar  navbar-expand-lg  navbar-dark">
    <div id="mySidenav" class="sidenav">
      <a id="closeBtn"  class="close">×</a>
      <ul>
        <div class="navHover">
        <li><a href="?url=profil">Profil</a></li>
        <li><a href="?url=suivies">Contacts</a></li>
        <li><a href="?url=mentionLegales">Mentions légales</a></li>
        <li><a href="?url=connexion">Se connecter</a></li>
        <li><a href="?url=compte">Compte</a></li>
        </div>
        <li><a>
        <input id="searchbar" onkeyup="search_user()" type="text"
            name="search" placeholder="Chercher"></a></li>
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
      <a class="nav-link <?php if($menu['page'] == "boutique") echo "active" ?>" aria-current="page" href="?url=boutique">
      <button class="rounded-button" ><span class="fa-solid fa-cart-shopping fa-bounce"></span>ㅤBoutique</button>
        </a>
      <a class="nav-link <?php if($menu['page'] == "accueil") echo "active" ?>" aria-current="page" href="?url=accueil">
      <button class="rounded-button">Accueil</button>
      </a>
    </div>
  </nav>
  <script src="/src/js/script-burger.js" defer></script>
</header>