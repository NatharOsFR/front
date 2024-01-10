<?php
require_once('src/controllers/c-accueil.php');
require_once('src/controllers/c-connexion.php');
require_once('src/controllers/c-boutique.php');
require_once('src/controllers/c-creationPost.php');
require_once('src/controllers/c-post.php');
require_once('src/controllers/c-profil.php');
require_once('src/controllers/c-abonnements.php');
require_once('src/controllers/c-abonnes.php');
require_once('src/controllers/c-mention_legales.php');
require_once('src/controllers/c-compte.php');
require_once('src/controllers/c-messagerie.php');
require_once('src/controllers/c-recherche.php');


$requestUri = $_SERVER['REQUEST_URI'];

// Diviser le chemin en segments
$urlSegments = explode('/', $requestUri);

// Retirer les segments vides
$urlSegments = array_filter($urlSegments);

// Récupérer le dernier segment (qui devrait être la page demandée)
$page = end($urlSegments);

// Vérifier si l'URL est de la forme "user/nickname"
  if (isset($urlSegments[1]) && $urlSegments[1] === '?url=user' && isset($urlSegments[2])) {

    // Récupérer le nickname
    $nickname = $urlSegments[2];

    // Appeler la fonction avec le nickname
    profiluser($nickname);
  }
    else if (isset($urlSegments[1]) && $urlSegments[1] === 'post' && isset($urlSegments[2])) {

    // Récupérer l'id du post
    $postonly = $urlSegments[2];

    // Appeler la fonction avec le nickname
    postonly($postonly);
} else {
    // Traiter les autres cas
    if(isset($_GET['url']) && $_GET['url']){
        $url = rtrim($_GET['url'], '/');

        switch ($url){
            case "connexion":
                connexion();
                break;
            case "profil":
                profil();
                break;
            case "mentionLegales":
                mentionLegales();
                break;
            case "post":
                post();
                break;
            case "profil":
                profil();
                break;
            case "messagerie":
                messagerie();
                break;
            case "abonnements":
                abonnements();
                break;
             case "abonnes":
                abonnes();
                break;
            case "creationPost":
                creationPost();
                break;
            case "boutique":
                boutique();
                break;
            case "compte":
                compte();
                break;
          case "recherche":
                recherche();
                break;
            default:
                accueil();
        } 
    } else {
        accueil();
    }
}
?>
