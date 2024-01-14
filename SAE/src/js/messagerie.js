let currentRoom = 'general'; // Définir le salon par défaut
let messagesContainer; 
let messageInput;
let roomButtons;
let reloadButton;
let Id;
let nickname;
let picture;
let lastDate;
let isFirstIteration = true;
let loadedFollowers;
const messageQueue = [];

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
async function loadDataByID(user_id) {
  try {
    const profileResponse = await new Promise((resolve, reject) => {
      socket.emit('getProfileDataById', { token, user_id: user_id });

      socket.once('reponsegetProfileDataById', (response) => {
        resolve(response);
      });

      socket.once('error', (error) => {
        reject(error);
      });
    });

    const nickname = profileResponse.response.nickname;
    const picture = profileResponse.response.picture;
    const data = [nickname, picture];
    return data;

  } catch (error) {
    console.error('Erreur lors de la récupération des données de profil:', error);
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
                const listeUser = currentRoom.split('_'); // Récupérer les utilisateurs dans le salon privé
                const privateUsers = listeUser; 
                const user2 = listeUser[2];

                socket.emit('privateChatMessage', { message, room: currentRoom, nickname : nickname, picture: picture, userId: Id, privateUsers });
                socket.emit('existConv', {token, user_id: user2});  

                // Écouter la réponse du serveur
                socket.once('reponseexistConv', (donnees) => {
                socket.emit('sendConv',{conv_id: donnees.response[0]._id,message,picture : "",token});
              });
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

function addMessageBefore(message, nickname, picture) {
    const messageElement = document.createElement('div');

    const image = document.createElement('img');
    image.src = picture || "includes/plus.png";
    image.alt = 'Image de profil';

    image.style.width = '5%';
    image.style.height = '5%';
    image.style.borderRadius = '50%';

    messageElement.appendChild(image);

    const capitalizedNickname = (nickname && /^[a-zA-Z]/.test(nickname))
        ? nickname.charAt(0).toUpperCase() + nickname.slice(1)
        : nickname;

    const messageTextElement = document.createElement('span');
    messageTextElement.textContent = `${capitalizedNickname}: ${message}`;

    messageElement.appendChild(messageTextElement);

    // Obtenez une référence au premier enfant de messagesContainer
    const firstChild = messagesContainer.firstChild;

    // Insérez le messageElement avant le premier enfant
    messagesContainer.insertBefore(messageElement, firstChild);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}


function addMessage(message, nickname, picture) {
    const messageElement = document.createElement('div');

    const image = document.createElement('img');
    image.src = picture || "includes/plus.png";
    image.alt = 'Image de profil';
  
    image.style.width = '5%';
    image.style.height = '5%';
    image.style.borderRadius = '50%';

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
async function fetchData(message) {
  try {

    // Ajouter le message à la file d'attente
    messageQueue.push(message);

    // Démarrer le traitement de la file d'attente
    processQueue();
  } catch (error) {
    console.error('Erreur lors de la récupération des données de profil:', error);
  }
}

async function processQueue() {
  // Traiter la file d'attente uniquement si elle n'est pas vide
  if (messageQueue.length > 0) {
    const message = messageQueue.shift(); // Retirer le premier message de la file d'attente
    const data = await loadDataByID(message.userId);
    addMessage(message.message, data[0], data[1]);
    // Appeler récursivement pour traiter le prochain message dans la file d'attente
    processQueue();
  }
}
async function processQueuebefore() {
  // Traiter la file d'attente uniquement si elle n'est pas vide
  if (messageQueue.length > 0) {
    const message = messageQueue.shift(); // Retirer le premier message de la file d'attente
    const data = await loadDataByID(message.userId);
    addMessageBefore(message.message, data[0], data[1]);
    // Appeler récursivement pour traiter le prochain message dans la file d'attente
    processQueuebefore();
  }
}

function MessageriePrivee(user_id){
  // Émettre un événement pour demander la conv existe déja 
  socket.emit('existConv', {token, user_id: user_id });

  // Écouter la réponse du serveur
  socket.once('reponseexistConv', (donnees) => {
    // Les données sont disponibles dans la variable 'donnees'
    if (donnees.statusCode == 500) {
      return 0;
    } else if(donnees.statusCode == 200){
      socket.emit('getMessage', {token,conv_id: donnees.response[0]._id,message_date :""});
      socket.once('reponsegetMessage', (donnees) => {
        donnees.response.forEach(message => {
          if (isFirstIteration) {
            lastDate = message.creation;
            isFirstIteration = false;
          }
          messageQueue.push(message);
        });
        processQueue();

      });
    }else if (donnees.statusCode == 400) {
      socket.emit('createConv', { users_id: [user_id], token });
      socket.once('reponsecreateConv', (donnees) => {
      })
      console.log("conv créée");
    }
  });
  return 3;
}

function changeRoom(room) {
    currentRoom = room;

    messagesContainer.innerHTML = ''; // Effacer les messages en changeant de salon
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
        const user2 = privateUsers[1];
        // Créer le salon privé (s'il n'existe pas déjà)
        const privateRoomId = createPrivateRoom(privateUsers);
      
        MessageriePrivee(user2);

        const container = document.getElementById('container');

        
        const referenceElement = container.firstchild;

        // Insérez le bouton Reload avant la référence
        container.insertBefore(reloadButton, referenceElement);
      
        // Rejoindre le salon privé
        socket.emit('joinPrivateRoom', { roomId: privateRoomId });

        
    }

    
}

document.addEventListener('DOMContentLoaded', () => {
    messagesContainer = document.getElementById('messages-container');
    messageInput = document.getElementById('message-input');
    roomButtons = document.getElementById('room-buttons');
    reloadButton = document.createElement('button');
    reloadButton.textContent = 'Reload';

    // Ajoutez des styles au bouton
    reloadButton.style.padding = '10px 20px';
    reloadButton.style.fontSize = '16px';
    reloadButton.style.backgroundColor = '#4CAF50';  // Couleur de fond verte
    reloadButton.style.color = 'white';             // Couleur du texte blanche
    reloadButton.style.border = 'none';
    reloadButton.style.borderRadius = '5px';
    reloadButton.style.cursor = 'pointer';
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
    
    reloadButton.addEventListener('click', function() {
      const listeUser = currentRoom.split('_'); // Récupérer les utilisateurs dans le salon privé
      const user2 = listeUser[2];
      console.log("reload");
      socket.emit('existConv', {token, user_id: user2});  

      socket.once('reponseexistConv', (donnees) => {
        socket.emit('getMessage',{token,conv_id: donnees.response[0]._id,message_date :lastDate});
        socket.once('reponsegetMessage', (donnees) => {
          donnees.response.forEach(message => {
            if (isFirstIteration) {
              lastDate = message.creation;
              isFirstIteration = false;
            }
            messageQueue.push(message);
          });
          processQueuebefore();
          
  
        });
      });
      isFirstIteration = true;
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
