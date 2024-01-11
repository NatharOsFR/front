const cardContainer = document.getElementById('cardContainer');
let loading = false;
let lastPostId = "";
const displayedPostIds = [];


function getSinglePost(postId, callback) {
    socket.emit('getProfileData', { token });

    socket.once('reponsegetProfileData', (response) => {
        socket.emit('post', { user_id: response.response._id, post_id: postId });

        socket.once('reponsepost', (response1) => {
           
            callback(response1.response);
        });
    });
}

function generateCard(postData,creatorInfo) {
    const card = document.createElement('div');
    card.className = 'card';
    card.classList.add('PostMessage');

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
  
      const user = document.createElement('h3');
      user.className = 'user';
      
      // Vérifiez si le nickname n'est pas vide et s'il commence par une lettre
      if (creatorInfo.nickname && /^[a-zA-Z]/.test(creatorInfo.nickname)) {
          // Mettez la première lettre en majuscule
          const capitalizedNickname = creatorInfo.nickname.charAt(0).toUpperCase() + creatorInfo.nickname.slice(1);
        
          user.innerHTML = `<div class="titre"><img src="${creatorInfo.picture || "includes/humain.png"}" class="imgHumain"> ${capitalizedNickname}</div>`;
      } else {
          // Le nickname est vide ou ne commence pas par une lettre, utilisez-le tel quel
          user.innerHTML = `<div class="titre"><img src="${creatorInfo.picture || "includes/humain.png"}" class="imgHumain"> ${creatorInfo.nickname}</div>`;
      }

      leftSide.appendChild(user);

  

  if (postData.buy) {
    getUserInfoById(postData.ownerId, (ownerData) => {
        
        const ownerInfo = document.createElement('div');
        ownerInfo.className = 'owner-info';

        // Vérifiez de nouveau le nickname pour mettre la première lettre en majuscule si nécessaire
        if (ownerData.nickname && /^[a-zA-Z]/.test(ownerData.nickname)) {
            const capitalizedNickname = ownerData.nickname.charAt(0).toUpperCase() + ownerData.nickname.slice(1);

            ownerInfo.innerHTML = `
                <h5 class="titreInfoPost" ><img src="${ownerData.picture || "includes/dl.png"}" class="imgHumain"> ${capitalizedNickname}</h5>
                <div class="containerPostPrix">
                    <img src="includes/MatriceCoin.png" class="imgPostMoney">
                    <span class="textPrixPost">${postData.price}</span>
                    <img id="imgBuy" src="includes/buy.png" class="imgBuy">
                </div>
            `;
        } else {
            ownerInfo.innerHTML = `
                <h5 class="titreInfoPost" ><img src="${ownerData.picture || "includes/dl.png"}" class="imgHumain">${ownerData.nickname}</h5>
                <div class="containerPostPrix">
                    <img src="includes/MatriceCoin.png" class="imgPostMoney">
                    <span class="textPrixPost">${postData.price}</span>
                    <img id="imgBuy" src="includes/buy.png" class="imgBuy">
                </div>
            `;
        }

          const buyButton = ownerInfo.querySelector('#imgBuy');
          const buyConfirmationDialog = document.getElementById('buyConfirmationDialog');
          const confirmBuyButton = document.getElementById('confirmBuy');
          const cancelBuyButton = document.getElementById('cancelBuy');

          buyButton.addEventListener('click', () => {
              // Show the buy confirmation dialog when the "Buy" button is clicked
              showBuyConfirmationDialog();
          });

          // Assuming you want to handle the buy action immediately on confirmation
          confirmBuyButton.addEventListener('click', () => {
              // Handle the buy action here
              console.log('Buy button clicked for post ID:', postData._id);
              // You can add your logic for handling the buy action

              // Send the buy event to the server
              const post_id = postData._id;

              socket.emit('postbuy', { post_id, token });
              socket.once('reponsepostbuy', (response) => {
                  
              });

              // Hide the buy confirmation dialog after confirmation
              hideBuyConfirmationDialog();
              location.reload();
          });

          // Cancel the buy action if the user cancels the confirmation
          cancelBuyButton.addEventListener('click', () => {
              // Hide the buy confirmation dialog on cancellation
              hideBuyConfirmationDialog();
          });

          rightSide.appendChild(ownerInfo);
          rightSide.appendChild(actionButtons);
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

    partage.addEventListener('click', function() {

      urlActuelle = window.location.href;


        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = urlActuelle;
        document.body.appendChild(tempTextarea);

        tempTextarea.select();
        document.execCommand('copy');

        document.body.removeChild(tempTextarea);

        alert('L\'URL a été copiée dans le presse-papiers.');
    });
   
    Infos.appendChild(leftSide);
    Infos.appendChild(rightSide);
    card.appendChild(Infos);

    const commentBar = generateCommentBar(postData._id);
    card.appendChild(commentBar);

   if (!postData.buy){
      rightSide.appendChild(actionButtons);
   }
    return card;
}


function showBuyConfirmationDialog() {
    buyConfirmationDialog.style.display = 'block';
}

function hideBuyConfirmationDialog() {
    buyConfirmationDialog.style.display = 'none';
}

function generateCommentBar(postId) {
    const commentBar = document.createElement('div');
    commentBar.className = 'comment-bar';

    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Ajouter un commentaire...';
    commentBar.appendChild(commentInput);

    const sendButton = document.createElement('button');
    sendButton.textContent = 'Envoyer';
    sendButton.className = 'CommentButton';
    sendButton.addEventListener('click', () => {
        const commentText = commentInput.value;
        if (commentText.trim() !== '') {
            sendComment(postId, commentText);
            commentInput.value = '';
        }
    });
    commentBar.appendChild(sendButton);

    return commentBar;
}

function getUserInfoById(id, callback) {
    // Émettre la demande d'informations de profil
    socket.emit('getProfileDataById', { user_id: id });

    // Écouter l'événement 'reponsegetProfileDataById' pour récupérer les informations de profil
    socket.on('reponsegetProfileDataById', (response) => {
        // Retirer l'écouteur après l'avoir utilisé une fois
        socket.off('reponsegetProfileDataById');

        // Extraire les informations de profil de la réponse
        const userInfo = {
            nickname: response.response.nickname,
            picture: response.response.picture || 'includes/default-profile-picture.jpg',
        };

        // Appeler la fonction de rappel avec les informations de l'utilisateur
        callback(userInfo);
    });
}

function getUserInfoById2(id, callback) {
    // Émettre la demande d'informations de profil
    socket.emit('getProfileDataById', { user_id: id });

    // Écouter l'événement 'reponsegetProfileDataById' pour récupérer les informations de profil
    socket.on('reponsegetProfileDataById', (response) => {
        // Retirer l'écouteur après l'avoir utilisé une fois
        socket.off('reponsegetProfileDataById');

        // Extraire les informations de profil de la réponse
        const userInfo = {
            nickname: response.response.nickname,
            picture: response.response.picture || 'includes/default-profile-picture.jpg',
        };

        // Appeler la fonction de rappel avec les informations de l'utilisateur
        callback(userInfo);
    });
}

function sendComment(postId, commentText) {
    const commentData = {
        postId,
        description: commentText,
        motherId: postId,
        token,
    };

    socket.emit('createPost', commentData);

    socket.once('reponsecreatePost', (response) => {
        console.log('Réponse du serveur (addComment):', response);
    });
}

function showComments(postId, comments) {
    // Trouver ou créer le conteneur des commentaires
    let commentContainer = document.getElementById(`comments-${postId}`);

  if (!commentContainer) {
      // Si le conteneur n'existe pas, le créer
      commentContainer = document.createElement('div');
      commentContainer.id = `comments-${postId}`;
      commentContainer.classList.add('commentContainer');
      document.body.appendChild(commentContainer);

  }


    // Efface tous les commentaires existants
    while (commentContainer.firstChild) {
        commentContainer.removeChild(commentContainer.firstChild);
    }

    // Affiche les nouveaux commentaires
    comments.forEach((comment) => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';

      
        // Créer un élément pour le nickname et la photo de profil
        const userContainer = document.createElement('div');
        userContainer.className = 'user-container';

        const userSousContainer = document.createElement('div');
        userSousContainer.className = 'user-souscontainer';
        
        // Ajouter la photo de profil
        const userImage = document.createElement('img');
        // Récupérer la picture du créateur du commentaire
        getUserInfoById(comment.creatorId, (creatorInfo) => {
            userImage.src = creatorInfo.picture || 'includes/default-profile-picture.jpg';
        });
        userImage.className = 'user-image';
        userSousContainer.appendChild(userImage);

        // Ajouter le nickname
        const userNickname = document.createElement('span');
        // Récupérer le nickname du créateur du commentaire
      getUserInfoById(comment.creatorId, (creatorInfo) => {
          // Vérifiez si le nickname n'est pas vide et s'il commence par une lettre
          if (creatorInfo.nickname && /^[a-zA-Z]/.test(creatorInfo.nickname)) {
              // Mettez la première lettre en majuscule
              const capitalizedNickname = creatorInfo.nickname.charAt(0).toUpperCase() + creatorInfo.nickname.slice(1);
              userNickname.textContent = capitalizedNickname + " : ";
          } else {
              // Le nickname est vide ou ne commence pas par une lettre, utilisez-le tel quel
              userNickname.textContent = creatorInfo.nickname + " : ";
          }
      });
        userNickname.className = 'user-nickname';
        userSousContainer.appendChild(userNickname);

        // Ajouter le conteneur du nickname et de la photo de profil à l'élément du commentaire
  
       userContainer.appendChild(userSousContainer);
        // Ajouter le texte du commentaire
        const commentText = document.createElement('span');
        commentText.textContent = comment.description;
        userContainer.appendChild(commentText);
        commentElement.appendChild(userContainer);

        // Ajouter le bouton de like
      const likeButtonContainer = document.createElement('div');
      likeButtonContainer.className = 'ContainerLikeText';
      const likeCount = document.createElement('div');
      likeCount.style.fontSize = '20px';
      likeCount.textContent = '0';

      const likeButton = document.createElement('img');
      likeButton.src = 'includes/like.png';
      likeButton.alt = 'Like';
      likeButton.className = 'img-like';

      likeButton.addEventListener('click', () => {
          // Mettez ici la logique pour gérer le like du commentaire
          console.log(`Commentaire ID ${comment._id} liké !`);
      });
      
      likeButtonContainer.appendChild(likeCount);
      likeButtonContainer.appendChild(likeButton);

      commentElement.appendChild(likeButtonContainer);

        // Ajouter l'élément du commentaire au conteneur des commentaires
        commentContainer.appendChild(commentElement);
    });
}



// Fonction pour récupérer les commentaires d'un post
function getCommentsForPost(postId) {
    // Émettre l'événement 'commentaire' vers le serveur pour récupérer les commentaires
    socket.emit('commentaire', { post_id: postId, posts_id: [] });

    // Écouter l'événement 'reponsecommentaire' pour afficher les commentaires
    socket.on('reponsecommentaire', (data) => {
        const { response, error } = data;

        if (error) {
            console.error(`Erreur lors de la récupération des commentaires du post (${postId}):`, error);
        } else {
            // Assurez-vous que response est un tableau avant de l'utiliser
            if (Array.isArray(response)) {
                // Afficher les commentaires sous le post
                showComments(postId, response);
            } else {
                console.error('La réponse du serveur n\'est pas un tableau de commentaires:', response);
            }
        }
    });
}



function showSinglePost(postId) {
    getSinglePost(postId, (postData) => {
        if (!displayedPostIds.includes(postData._id)) {
          getUserInfoById(postData.creatorId, (creatorInfo) => {
            const card = generateCard(postData,creatorInfo);
            cardContainer.appendChild(card);
            displayedPostIds.push(postData._id);
            getCommentsForPost(postData._id); 
          });
            
        }
    });
}


showSinglePost(postid);
