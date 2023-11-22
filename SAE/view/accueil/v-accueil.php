<body>
    <div class="container mt-5 mb-5">
        <div id="cardContainer" class="postAccueil">
        </div>
      <button class="fixed-button" ><a class="nav-link lienPost <?php if($menu['page'] == "creationPost") echo "active" ?>" aria-current="page" href="?url=creationPost">+ Nouveau post</a></button>
    </div>
  <script src="https://cdn.socket.io/4.0.1/socket.io.min.js"></script>
  <script src="/src/js/script-post.js" defer></script>
  <script src="/src/socketClient.js" defer></script>
</body>
 
