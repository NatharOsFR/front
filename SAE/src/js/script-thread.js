function creationthread(){
  socket.emit('createThread', { token });
}

function feedthread(callback){
  socket.emit('feedThread', { token });
  socket.once('reponsefeedThread', (response1) => {

      callback(response1.response); // Utilisez le callback pour transmettre la réponse
  });
}

function deletethread(){
  socket.emit('deleteThread', { token });
}

creationthread();
/* Posts */

const cardContainer = document.getElementById('cardContainer');
let loading = false;  // Variable pour gérer le chargement en cours
let lastPostId = "";  // Variable pour stocker le dernier post_id
const displayedPostIds = []; // Liste pour stocker les IDs des posts déjà affichés


function getDataCard(postidlast, callback) {
  // Émission de l'événement 'connexion' vers le serveur
  socket.emit('getProfileData', { token });

  // Écoute de l'événement 'reponseconnexion' une seule fois
  socket.once('reponsegetProfileData', (response) => {
    const user_id = response.response._id;

    socket.emit('getPostProfile', { user_id, post_id: postidlast });

    // Écoute de l'événement 'reponsegetPostProfile' une seule fois
    socket.once('reponsegetPostProfile', (response1) => {
      // Ajoute le nickname à la réponse avant de la transmettre
      response1.response.nickname = nickname;

      callback(response1.response); // Utilisez le callback pour transmettre la réponse
    });
  });
}

function getUserInfoById(id, callback) {
  // Émission de l'événement 'getProfileDataById' vers le serveur
  socket.emit('userGroup', { users_id: id ,token});

  // Écoute de l'événement 'reponsegetProfileDataById' une seule fois
  socket.once('reponseuserGroup', (response) => {
      callback(response);
  });
}

function generateCard(postData,ownerdata,creatorInfo) {
  const card = document.createElement('div');
  card.className = 'card';
  card.classList.add('cardCSS');

  const Infos = document.createElement('div');
  Infos.className = 'Infos';

  const leftSide = document.createElement('div');
  leftSide.className = 'left-side';

  const rightSide = document.createElement('div');
  rightSide.className = 'right-side';

  const image = document.createElement('img');
  image.src = postData.picture || 'includes/Test.png';
  image.className = 'imgMain';
  card.appendChild(image);

  const description = document.createElement('p');
  description.className = 'description';
  description.textContent = postData.description;
  leftSide.appendChild(description);
  // Utilise la fonction getUserInfoById pour obtenir le nom d'utilisateur et la photo de profil

    const user = document.createElement('h3');
    user.className = 'user';
    user.innerHTML = `<div class="titre"><img src="${creatorInfo.picture||"includes/humain.png"}" class="imgHumain"> ${creatorInfo.nickname}</div>`;
    leftSide.appendChild(user);
  // Ajoute la partie seulement si postData.buy est true
  if (postData.buy) {

      const ownerInfo = document.createElement('div');
      ownerInfo.className = 'owner-info';
      ownerInfo.innerHTML = `
        <h5 class="titreInfoPost" ><img src="${ownerdata.picture||"includes/dl.png"}" class="imgHumain"> ${ownerdata.nickname}</h5>
        <div class="containerPostPrix">
          <img src="includes/MatriceCoin.png" class="imgPostMoney">
          <span class="textPrixPost">${postData.price}</span>
          <img src="includes/buy.png" class="imgBuy">
        </div>
      `;
      rightSide.appendChild(ownerInfo);

  }

  const actionButtons = document.createElement('div');
  actionButtons.className = 'actionButtons';

  const chat = document.createElement('img');
  chat.src = 'includes/chat.png';
  chat.className = 'img-chat';
  actionButtons.appendChild(chat);

  const like = document.createElement('img');
  like.src= 'includes/like.png';
  like.className = 'img-like';
  like.Name = 'img-like';
  like.setAttribute('post-id', postData._id);
  socket.emit('getProfileData', { token });

  // Écoute de l'événement 'reponseconnexion' une seule fois
  socket.once('reponsegetProfileData', (profilData) => {
  setupLikeEvent(like, profilData);
  })
  
  actionButtons.appendChild(like);


  const compteurLike = document.createElement('div');
  compteurLike.textContent = postData.likes;
  compteurLike.style.fontSize = '20px';
  actionButtons.appendChild(compteurLike);

  const partage = document.createElement('img');
  partage.src = 'includes/partage.png';
  partage.className = 'img-partage';
  actionButtons.appendChild(partage);

  rightSide.appendChild(actionButtons);
  Infos.appendChild(leftSide);
  Infos.appendChild(rightSide);
  
  card.appendChild(Infos);

  // Ajoute un gestionnaire d'événements "click" à la carte
  chat.addEventListener('click', () => {
    // Redirige vers le lien /post/idpost
    window.location.href = `/?url=post/${postData._id}`;
  });

  partage.addEventListener('click', function() {
    let urlActuelle = window.location.href;

    urlActuelle = urlActuelle.replace(/\?url=accueil$/, `?url=post/${postData._id}`);


      const tempTextarea = document.createElement('textarea');
      tempTextarea.value = urlActuelle;
      document.body.appendChild(tempTextarea);

      tempTextarea.select();
      document.execCommand('copy');

      document.body.removeChild(tempTextarea);

      alert('L\'URL a été copiée dans le presse-papiers.');
  });
  
  return card;
}

// Supprime les cartes existantes
while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
}

// Fonction pour charger le prochain lot de posts
async function loadNextPosts() {
  if (!loading) {
    loading = true;

    // Utilisez le dernier post_id pour charger les nouveaux posts
      feedthread(async (newPosts) => {
      // Ajoute les nouvelles cartes pour chaque nouveau post
      for (const postData of newPosts) {
        // Vérifie si l'ID du post a déjà été affiché
        if (!displayedPostIds.includes(postData._id)) {
          await generateAndDisplayCard(postData);
        }
      }

      // Met à jour le dernier post_id
      if (newPosts.length > 0) {
        lastPostId = newPosts[newPosts.length - 1]._id;
      }

      loading = false;
    });
  }
}

// Fonction pour obtenir les informations du propriétaire de manière asynchrone
function getData(postData) {
  return new Promise((resolve) => {
    getUserInfoById([postData.creatorId,postData.ownerId], (ownerData) => {
    resolve(ownerData);
    });
  });
}

// Fonction pour générer une carte avec toutes les informations
async function generateAndDisplayCard(postData) {
  const userInfo = await getData(postData);
  const userdata = userInfo.response
  const lenghtuser = userdata.length;
    // Création d'objets utilisateur avec seulement nickname et picture
  if (lenghtuser==2){
    const usercreator = {
        nickname: userdata[0].nickname,
        picture: userdata[0].picture
    };

    const owneruser = {
        nickname: userdata[1].nickname,
        picture: userdata[1].picture
    };
    const card = generateCard(postData,owneruser, usercreator);
    cardContainer.appendChild(card);
    displayedPostIds.push(postData._id);

  }else{
    const usercreator = {
        nickname: userdata[0].nickname,
        picture: userdata[0].picture
    };
      const card = generateCard(postData,usercreator, usercreator);
      cardContainer.appendChild(card);
      displayedPostIds.push(postData._id);
    };
}


// Exemple d'utilisation avec une boucle asynchrone
feedthread(async (postsFromSocket) => {
  console.log(postsFromSocket);
  // Affichez les cartes de manière asynchrone
  for (const postData of postsFromSocket) {
    if (!displayedPostIds.includes(postData._id)) {
      await generateAndDisplayCard(postData);
    }
  }
});

// Ajoute un gestionnaire d'événement pour détecter le défilement
window.addEventListener('scroll', () => {
    const distanceToBottom = document.body.offsetHeight - (window.scrollY + window.innerHeight);
    if (distanceToBottom < 100) {
        loadNextPosts();
    }
});

function setupLikeEvent(likeButton, profilData) {
  const postId = likeButton.getAttribute('post-id');
  console.log('Post ID:', postId);

  const nickname = profilData.response.nickname; 

  socket.emit('user', { nickname });
  console.log('nickname:', nickname);

  socket.once('reponseuser', function (userdata) {
    console.log('User data:', userdata);

    const user_id = userdata.response._id;
    console.log(user_id)
    socket.emit('doILike', { user_id, token, post_id: postId });

    socket.once('reponsedoILike', function (LikeData) {
      console.log('Like data:', LikeData);

      const isLiked = LikeData && LikeData.response ? LikeData.response.liked : false;
      console.log('Is liked:', isLiked);

      if(isLiked){
         likeButton.src = 'includes/likeOK.png'; 
      }
      else
      {
         likeButton.src = 'includes/like.png'; 
      }
    });
  });
  
  likeButton.addEventListener('click', function () {
    const postId = likeButton.getAttribute('post-id');
    console.log('Post ID:', postId);

    const nickname = profilData.response.nickname; 

    socket.emit('user', { nickname });
    console.log('nickname:', nickname);

    socket.once('reponseuser', function (userdata) {
      console.log('User data:', userdata);

      const user_id = userdata.response._id;
      console.log(user_id)
      socket.emit('doILike', { user_id, token, post_id: postId });

      socket.once('reponsedoILike', function (LikeData) {
        console.log('Like data:', LikeData);

        const isLiked = LikeData && LikeData.response ? LikeData.response.liked : false;
        console.log('Is liked:', isLiked);

        toggleLike(isLiked, user_id, postId, likeButton);
      });
    });
  });
}


function toggleLike(isLiked, user_id, postId, likeButton) {
  console.log(likeButton);
 
  if (isLiked) {
    socket.emit('dislike', { user_id, token, post_id: postId });
    console.log("dislike");
    likeButton.src = 'includes/like.png'; 
  } else {
    socket.emit('like', { user_id, token, post_id: postId });
    console.log("like");
    likeButton.src = 'includes/likeOK.png'; 
  }
}