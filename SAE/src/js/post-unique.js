const cardContainer = document.getElementById('cardContainer');
let loading = false;
let lastPostId = "";
const displayedPostIds = [];




function getSinglePost(postId, callback) {
    socket.emit('getProfileData', { token });

    socket.once('reponsegetProfileData', (response) => {
        socket.emit('post', { user_id: response.response._id, post_id: postId });

        socket.once('reponsepost', (response1) => {
            console.log(response1.response);
            callback(response1.response);
        });
    });
}


function generateCard(postData) {
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

    const commentBar = generateCommentBar(postData._id);
    card.appendChild(commentBar);

    return card;
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
    socket.emit('getProfileDataById', { user_id: id });

    socket.once('reponsegetProfileDataById', (response) => {
        const userInfo = {
            nickname: response.response.nickname,
            picture: response.response.picture || 'includes/default-profile-picture.jpg',
        };
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

function showComments(postId, comments, commentContainer) {
    // Trouver ou créer le conteneur des commentaires
    let commentContainer = document.getElementById(`comments-${postId}`);

    if (!commentContainer) {
        // Si le conteneur n'existe pas, le créer
        commentContainer = document.createElement('div');
        commentContainer.id = `comments-${postId}`;
        document.body.appendChild(commentContainer); // Ajoutez-le à l'élément parent approprié, par exemple, document.body
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

        // Ajouter la photo de profil
        const userImage = document.createElement('img');
        // Récupérer la picture du créateur du commentaire
        getUserInfoById(comment.creatorId, (creatorInfo) => {
            userImage.src = creatorInfo.picture || 'includes/default-profile-picture.jpg';
        });
        userImage.className = 'user-image';
        userContainer.appendChild(userImage);

        // Ajouter le nickname
        const userNickname = document.createElement('span');
        // Récupérer le nickname du créateur du commentaire
        getUserInfoById(comment.creatorId, (creatorInfo) => {
            userNickname.textContent = creatorInfo.nickname;
        });
        userNickname.className = 'user-nickname';
        userContainer.appendChild(userNickname);

        // Ajouter le conteneur du nickname et de la photo de profil à l'élément du commentaire
        commentElement.appendChild(userContainer);

        // Ajouter le texte du commentaire
        const commentText = document.createElement('span');
        commentText.textContent = comment.description;
        commentElement.appendChild(commentText);

        // Ajouter le bouton de like
        const likeButton = document.createElement('button');
        likeButton.textContent = 'Like';
        likeButton.addEventListener('click', () => {
            // Mettez ici la logique pour gérer le like du commentaire
            console.log(`Commentaire ID ${comment._id} liké !`);
        });
        commentElement.appendChild(likeButton);

        // Ajouter l'élément du commentaire au conteneur des commentaires
        commentContainer.appendChild(commentElement);
    });
}



// Fonction pour récupérer les commentaires d'un post
function getCommentsForPost(postId) {

  const commentContainer = document.createElement('div');
  commentContainer.id = `comments-${postId}`;

  // Ajoute le conteneur des commentaires à l'endroit approprié dans votre application
  // Par exemple, vous pouvez l'ajouter à la fin de chaque carte générée
  const card = generateCard(postData); // Assurez-vous que postData est défini correctement
  card.appendChild(commentContainer);
  document.body.appendChild(card);
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
                showComments(postId, response, commentContainer);
            } else {
                console.error('La réponse du serveur n\'est pas un tableau de commentaires:', response);
            }
        }
    });
}



function showSinglePost(postId) {
    getSinglePost(postId, (postData) => {
        if (!displayedPostIds.includes(postData._id)) {
            const card = generateCard(postData);
            cardContainer.appendChild(card);
            displayedPostIds.push(postData._id);
            getCommentsForPost(postData._id); 
        }
    });
}

showSinglePost(postid);



