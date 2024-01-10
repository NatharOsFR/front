const followedContainer = document.getElementById('followedContainer');
const displayedFollowedIds = [];

function getFollowed(usersIdList, callback) {
    socket.emit('followed', { users_id: usersIdList, token });

    socket.once('reponsefollowed', (response) => {
        const followedList = response.response || [];
        console.log(response.response);
        callback(response.response);
    });
}

function loadFollowedBatch() {
    getFollowed(displayedFollowedIds, (followedFromSocket) => {
        console.log(followedFromSocket);
        const ulElement = document.querySelector('.followed-list');

        if (followedFromSocket && followedFromSocket.length > 0) {
            // Génère et affiche les éléments <li> pour chaque suiveur
            for (const followedInfo of followedFromSocket) {
                // Vérifie si l'ID du suiveur a déjà été affiché
                if (!displayedFollowedIds.includes(followedInfo._id)) {
                    const liElement = document.createElement('li');
                    liElement.className = 'followed';

                    // Crée un élément d'ancre (<a>) pour l'ensemble du <li>
                  const listItemLink = document.createElement('a');
                  listItemLink.href = `/user/${followedInfo.nickname}`;

                  const imgHumain = document.createElement('img');
                  imgHumain.src = followedInfo.picture || 'includes/default-profile-picture.jpg'; // Image par défaut
                  imgHumain.className = 'imgAbonnements';

                  const usernameSpan = document.createElement('span');

              
                  if (followedInfo.nickname && /^[a-zA-Z]/.test(followedInfo.nickname)) {

                      const capitalizedNickname = followedInfo.nickname.charAt(0).toUpperCase() + followedInfo.nickname.slice(1);
                      usernameSpan.textContent = capitalizedNickname;
                  } else {
                  
                      usernameSpan.textContent = followedInfo.nickname;
                  }

                    liElement.appendChild(imgHumain);
                    liElement.appendChild(usernameSpan);
                    listItemLink.appendChild(liElement);
                    ulElement.appendChild(listItemLink);

                    // Ajoute l'ID du suiveur à la liste des IDs déjà affichés
                    displayedFollowedIds.push(followedInfo._id);
                }
            }
        } else {
            // La liste est vide, affiche un message approprié
            const noContactMessage = document.createElement('li');
            noContactMessage.textContent = 'Aucun abonnements';
            noContactMessage.classList.add('no-contact-message'); // Ajoute la classe pour le style
            ulElement.appendChild(noContactMessage);
        }
    });
}

// Appel initial pour charger les premiers suiveurs
loadFollowedBatch();


