<?php
require_once('src/controllers/c-accueil.php');
require_once('src/controllers/c-connexion.php');
require_once('src/controllers/c-boutique.php');
require_once('src/controllers/c-creationPost.php');
require_once('src/controllers/c-post.php');
require_once('src/controllers/c-profil.php');
require_once('src/controllers/c-suivies.php');
require_once('src/controllers/c-mention_legales.php');
require_once('src/controllers/c-compte.php');

$requestUri = $_SERVER['REQUEST_URI'];

// Diviser le chemin en segments
$urlSegments = explode('/', $requestUri);

// Retirer les segments vides
$urlSegments = array_filter($urlSegments);

// Récupérer le dernier segment (qui devrait être la page demandée)
$page = end($urlSegments);

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
    case "suivies":
      suivies();
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
    default:
      accueil();
  } 
 }
 else {
   accueil();
} 