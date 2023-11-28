/* Posts */

const cardContainer = document.getElementById('cardContainer');
let loading = false;  // Variable pour gérer le chargement en cours
let lastPostId = "";  // Variable pour stocker le dernier post_id
const displayedPostIds = []; // Liste pour stocker les IDs des posts déjà affichés


// Utilise les données du socket pour générer et afficher les cartes
function getDataCard(postidlast, callback) {

    // Émission de l'événement 'connexion' vers le serveur
    socket.emit('user', { nickname });

    // Écoute de l'événement 'reponseconnexion' une seule fois
    socket.once('reponseuser', (response) => {
        socket.emit('getPostProfile', { user_id: response.response._id, post_id: postidlast });

        // Écoute de l'événement 'reponsegetPostProfile' une seule fois
        socket.once('reponsegetPostProfile', (response1) => {
            callback(response1.response); // Utilisez le callback pour transmettre la réponse
        });
    });
}

function idToNickname(id, callback) {
    // Émission de l'événement 'connexion' vers le serveur
    socket.emit('getProfileDataById', { user_id: id });
    socket.once('reponsegetProfileDataById', (response) => {
        callback(response.response.nickname); // Utilisez le callback pour transmettre la réponse
    });
}

function getUserInfoById(id, callback) {
  // Émission de l'événement 'getProfileDataById' vers le serveur
  socket.emit('getProfileDataById', { user_id: id });

  // Écoute de l'événement 'reponsegetProfileDataById' une seule fois
  socket.once('reponsegetProfileDataById', (response) => {
      const userInfo = {
          nickname: response.response.nickname,
          picture: response.response.picture || 'includes/default-profile-picture.jpg', // Remplacez 'default-profile-picture.jpg' par le chemin de votre image par défaut
      };

      callback(userInfo); // Utilisez le callback pour transmettre la réponse
  });
}

function generateCard(postData) {
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

  // Utilise la fonction getUserInfoById pour obtenir le nom d'utilisateur et la photo de profil
  getUserInfoById(postData.creatorId, (creatorInfo) => {
    const user = document.createElement('h3');
    user.className = 'user';
    user.innerHTML = `<div class="titre"><img src="${creatorInfo.picture||"includes/humain.png"}" class="imgHumain"> ${creatorInfo.nickname}</div>`;
    leftSide.appendChild(user);
  });

  const description = document.createElement('p');
  description.className = 'description';
  description.textContent = postData.description;
  leftSide.appendChild(description);

  // Ajoute la partie seulement si postData.buy est true
  if (postData.buy) {
    getUserInfoById(postData.creatorId, (creatorInfo) => {
      const ownerInfo = document.createElement('div');
      ownerInfo.className = 'owner-info';
      ownerInfo.innerHTML = `
        <h5 class="titreInfoPost" ><img src="${creatorInfo.picture||"includes/dl.png"}" class="imgHumain"> ${creatorInfo.nickname}</h5>
        <div class="containerPostPrix">
          <img src="includes/MatriceCoin.png" class="imgPostMoney">
          <span class="textPrixPost">${postData.price}</span>
          <img src="includes/buy.png" class="imgBuy">
        </div>
      `;
      rightSide.appendChild(ownerInfo);
    });
  }

  const actionButtons = document.createElement('div');
  actionButtons.className = 'actionButtons';

  const chat = document.createElement('img');
  chat.src = 'includes/chat.png';
  chat.className = 'img-chat';
  actionButtons.appendChild(chat);

  const like = document.createElement('img');
  like.src = 'includes/like.png';
  like.className = 'img-like';
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

  return card;
}

// Supprime les cartes existantes
while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
}

// Fonction pour charger le prochain lot de posts
function loadNextPosts() {
    if (!loading) {
        loading = true;

        // Utilisez le dernier post_id pour charger les nouveaux posts
        getDataCard(lastPostId, (newPosts) => {
            // Ajoute les nouvelles cartes pour chaque nouveau post
            for (const postData of newPosts) {
                // Vérifie si l'ID du post a déjà été affiché
                if (!displayedPostIds.includes(postData._id)) {
                    const card = generateCard(postData);
                    cardContainer.appendChild(card);

                    // Ajoute l'ID du post à la liste des IDs déjà affichés
                    displayedPostIds.push(postData._id);
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

// Exemple d'utilisation de la fonction avec un callback
getDataCard("", (postsFromSocket) => {
    console.log(postsFromSocket);

    // Génère et affiche les cartes pour chaque post
    for (const postData of postsFromSocket) {
        // Vérifie si l'ID du post a déjà été affiché
        if (!displayedPostIds.includes(postData._id)) {
            const card = generateCard(postData);
            cardContainer.appendChild(card);

            // Ajoute l'ID du post à la liste des IDs déjà affichés
            displayedPostIds.push(postData._id);
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
