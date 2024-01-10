document.addEventListener('DOMContentLoaded', function() {
    // Obtenez une référence vers le bouton
  loadProfileData();
    const subscribeButton = document.getElementById('subscribe-button');

    // Ajoutez un gestionnaire d'événements "click" au bouton
    subscribeButton.addEventListener('click', function() {
        socket.emit('user', { nickname });

        // Écouter la réponse à la demande 'doIFollow'
        socket.once('reponseuser', (userdata) => {
            const user_id = userdata.response._id;
            socket.emit('doIFollow', { user_id, token });
            // Écouter la réponse à la demande 'doIFollow'
            socket.once('reponsedoIFollow', (FollowData) => {
                const isFollowed = FollowData.response.Followed;
                toggleSubscription(isFollowed, user_id);
                
            });
        });
    });
  
    // Appel initial pour charger les informations du profil
    
});
function calculateAge(birthday) {
  const birthDate = new Date(birthday);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  return age;
}


function loadProfileData() {
  socket.emit('user',{nickname});
    socket.once('reponseuser', (userData) => {
    const usernameElement = document.getElementById('profile-username');

    // Vérifiez si le nickname n'est pas vide et s'il commence par une lettre
    if (userData.response.nickname && /^[a-zA-Z]/.test(userData.response.nickname)) {
        // Mettez la première lettre en majuscule
        const capitalizedNickname = userData.response.nickname.charAt(0).toUpperCase() + userData.response.nickname.slice(1);
        usernameElement.innerText = capitalizedNickname;
    } else {
        // Le nickname est vide ou ne commence pas par une lettre, utilisez-le tel quel
        usernameElement.innerText = userData.response.nickname;
    }
    document.getElementById('profile-image').src = userData.response.picture;
    document.getElementById('profile-age').innerText = `${calculateAge(userData.response.birthday)} ans`;
    document.getElementById('profile-bio').innerText = userData.response.bio || 'Aucune biographie disponible';
    document.querySelector('.profile-stats p:nth-child(1)').innerText = `${userData.response.posts} posts`;
    document.querySelector('.profile-stats p:nth-child(2)').innerText = `${userData.response.subscribes} abonnés`;
    document.querySelector('.profile-stats p:nth-child(3)').innerText = `${userData.response.subscribed} abonnements`;
    const user_id = userData.response._id;
    socket.emit('doIFollow', { user_id, token });

    socket.once('reponsedoIFollow', (FollowData) => {
        const subscribeButton = document.getElementById('subscribe-button');
        const isFollowed = FollowData.response.Followed;
        if (isFollowed) {
            subscribeButton.textContent = 'Se désabonner';
            subscribeButton.style.backgroundColor = 'white';
            subscribeButton.style.color = 'black';
        } else {
            subscribeButton.textContent = 'S\'abonner';
            subscribeButton.style.backgroundColor = '#06B5EC';  // Remplacez par la couleur que vous préférez
            subscribeButton.style.color = 'white';
        }
      });  
    });
  
  
}

function toggleSubscription(isFollowing, user_id) {
    // Mettez à jour l'apparence du bouton en fonction de l'état actuel
    const subscribeButton = document.getElementById('subscribe-button');
    if (isFollowing) {
        
        subscribeButton.textContent = 'S\'abonner';
        subscribeButton.style.backgroundColor = '#06B5EC';  // Remplacez par la couleur que vous préférez
        subscribeButton.style.color = 'white';
        socket.emit('unfollow', { user_id, token });
        location.reload();
    } else {
      subscribeButton.textContent = 'Se désabonner';
      subscribeButton.style.backgroundColor = 'white';
      subscribeButton.style.color = 'black';
      socket.emit('follow', { user_id, token });
      location.reload();
    }
}
