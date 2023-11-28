<?php
function post(){

  $menu['page'] = "post";
  require("view/inc/inc.head.php");
  require("view/inc/inc.header.php");
  require("view/post/v-post.php");
}

function postonly($postid){
  $menu['page'] = "post-only";
  require("view/inc/inc.head.php");
  require("view/inc/inc.header.php");
  $data['postid'] = $postid;
  extract($data);
  require("view/post/v-post-unique.php");
}


