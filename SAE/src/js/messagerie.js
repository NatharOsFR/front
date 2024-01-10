let currentRoom = 'general'; // Définir le salon par défaut
let messagesContainer; 
let messageInput;
let roomButtons;
let Id;
let nickname;
let picture;
let loadedFollowers;

document.addEventListener('DOMContentLoaded', () => {

    const messageInput = document.getElementById('message-input');

    messageInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
});

async function loadDataProfil() {
  try {
    const profileResponse = await new Promise((resolve, reject) => {
      // Émettre la demande de données de profil
      socket.emit('getProfileData', { token });

      // Écouter la réponse une fois
      socket.once('reponsegetProfileData', (response) => {
        resolve(response);
      });

      // Gérer les erreurs éventuelles
      socket.once('error', (error) => {
        reject(error);
      });
    });

    // Extraire le nickname de la réponse
    nickname = profileResponse.response.nickname;
    Id = profileResponse.response._id;
    picture= profileResponse.response.picture;

    // Extraire le nombre total d'utilisateurs suivis
    totalFollowers = profileResponse.response.followersCount;

  
  } catch (error) {
    console.error('Erreur lors de la récupération des données de profil:', error);
    // Gérer les erreurs ici
  }
}
async function loadFollowers() {
  try {
    const followersResponse = await new Promise((resolve, reject) => {
      // Émettre la demande des utilisateurs suivis avec un offset
      socket.emit('follower', { users_id: [], token, offset: loadedFollowers });

      // Écouter la réponse une fois
      socket.once('reponsefollower', (response) => {
        resolve(response);
      });

      // Gérer les erreurs éventuelles
      socket.once('error', (error) => {
        reject(error);
      });
    });

    // Mettre à jour le nombre d'utilisateurs chargés
    loadedFollowers += followersResponse.response.length;

    // Traiter la réponse et créer des boutons privés
    followersResponse.response.forEach((user) => {
      const privateRoomId = `private_${Id}_${user._id}`;
      createPrivateButton(user.nickname, privateRoomId);
    });

    // Si tous les utilisateurs suivis ont été chargés, masquer le bouton de chargement
     console.log(totalFollowers);
    if (loadedFollowers >= totalFollowers) {
      const loadMoreButton = document.getElementById('load-more-button');
      if (loadMoreButton) {
          loadMoreButton.style.display = 'none';
      }
    }
  } catch (error) {
    console.error('Erreur lors du chargement des utilisateurs suivis:', error);
    // Gérer les erreurs ici
  }
}

async function sendMessage() {
    try {
        const profileResponse = await new Promise((resolve, reject) => {
            // Émettre la demande de données de profil
            socket.emit('getProfileData', { token });

            // Écouter la réponse une fois
            socket.once('reponsegetProfileData', (response) => {
                resolve(response);
            });

            // Gérer les erreurs éventuelles
            socket.once('error', (error) => {
                reject(error);
            });
        });

        // Extraire le nickname de la réponse
        const nickname = profileResponse.response.nickname;
        const picture = profileResponse.response.picture;

        const message = messageInput.value.trim();
        if (message !== '') {
            // Vérifier si c'est une messagerie privée
            if (currentRoom.startsWith('private_')) {
                const privateUsers = currentRoom.split('_').slice(1); // Récupérer les utilisateurs dans le salon privé
                socket.emit('privateChatMessage', { message, room: currentRoom, nickname : nickname, picture: picture, userId: Id, privateUsers });
            } else {
                // Ce n'est pas une messagerie privée, envoyer normalement
                socket.emit('chatMessage', { message, room: currentRoom, nickname : nickname,picture: picture , userId: Id });
            }

            messageInput.value = '';
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données de profil:', error);
        // Gérer les erreurs ici
    }
}

function addMessage(message, nickname, picture) {
    const messageElement = document.createElement('div');

    const image = document.createElement('img');
    image.src = picture || "includes/plus.png";
    image.alt = 'Image de profil';

    messageElement.appendChild(image);

    const capitalizedNickname = (nickname && /^[a-zA-Z]/.test(nickname))
        ? nickname.charAt(0).toUpperCase() + nickname.slice(1)
        : nickname;

    const messageTextElement = document.createElement('span');
    messageTextElement.textContent = `${capitalizedNickname}: ${message}`;

    messageElement.appendChild(messageTextElement);

    messagesContainer.appendChild(messageElement);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function changeRoom(room) {
    currentRoom = room;

    // Désactiver tous les boutons
    const allButtons = roomButtons.querySelectorAll('button');
    allButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Activer le bouton correspondant à la nouvelle room
    const activeButton = roomButtons.querySelector(`button[data-room="${room}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }

    // Vérifier si c'est une messagerie privée
    if (room.startsWith('private_')) {
        const privateUsers = room.split('_').slice(1); // Récupérer les utilisateurs dans le salon privé

        // Créer le salon privé (s'il n'existe pas déjà)
        const privateRoomId = createPrivateRoom(privateUsers);

        // Rejoindre le salon privé
        socket.emit('joinPrivateRoom', { roomId: privateRoomId });
    }

    messagesContainer.innerHTML = ''; // Effacer les messages en changeant de salon
}

document.addEventListener('DOMContentLoaded', () => {
    messagesContainer = document.getElementById('messages-container');
    messageInput = document.getElementById('message-input');
    roomButtons = document.getElementById('room-buttons');
    loadDataProfil();

    // Écouter les messages entrants
    socket.on('chatMessage', (data) => {
        const { message, room, nickname,picture, userId } = data;
        if (room === currentRoom) {
            addMessage(message, nickname, picture);
        }
    });

    socket.on('privateChatMessage', (data) => {
        const { message, room, nickname,picture, userId, privateUsers } = data;
        if (currentRoom.includes(userId) &&
            currentRoom.includes(privateUsers[0]) &&
            currentRoom.includes(privateUsers[1]) &&
            privateUsers.includes(Id)) {
            addMessage(message, nickname, picture);
        }
    });

    // Écouter les utilisateurs suivis pour créer les boutons de discussions privées
    socket.on('reponsefollower', (followedUsers) => {
        // Créer des boutons de discussion privée pour chaque utilisateur suivi
        followedUsers.response.forEach((user) => {
            const privateRoomId = `private_${Id}_${user._id}`;
            createPrivateButton(user.nickname, privateRoomId);
        });
    });

    // Ajouter des écouteurs de clic pour chaque bouton de salon
    roomButtons.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            changeRoom(event.target.dataset.room);
        }
    });

    // Ajouter un écouteur de clic pour le bouton de chargement
    const loadMoreButton = document.getElementById('load-more-button');
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', loadFollowers);
    }

    // Lier la fonction sendMessage au clic sur le bouton
    window.sendMessage = sendMessage;

    // Demander les utilisateurs suivis au moment de la connexion
    socket.emit('follower', { users_id: [], token });

});


function createPrivateButton(username, roomId) {
    // Capitaliser la première lettre du nom d'utilisateur
    const capitalizedUsername = (username && /^[a-zA-Z]/.test(username))
        ? username.charAt(0).toUpperCase() + username.slice(1)
        : username;

    // Créer un bouton pour la discussion privée avec l'utilisateur
    const privateButton = document.createElement('button');
    privateButton.textContent = `${capitalizedUsername}`;
    privateButton.dataset.room = roomId;

    // Ajouter le bouton à la liste des boutons
    roomButtons.appendChild(privateButton);
}

// Structure pour stocker les salons privés
const privateRooms = {};

// Fonction pour créer un salon privé
function createPrivateRoom(users) {
    // Générer un identifiant unique pour le salon privé
    const roomId = `private_${users.join('_')}`;

    // Stocker l'association du salon privé dans la structure de données
    privateRooms[roomId] = users;

    return roomId;
}
