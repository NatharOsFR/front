<?php


function profil(){

  $menu['page'] = "profil";
  require("view/inc/inc.head.php");
  require("view/inc/inc.header.php");
  require("view/profil/v-profil.php");
}

function profiluser($nickname){
  $menu['page'] = "profil-user";
  require("view/inc/inc.head.php");
  require("view/inc/inc.header.php");
  $data['nickname'] = $nickname;
  extract($data);
  require("view/profil/v-profil-user.php");
}

