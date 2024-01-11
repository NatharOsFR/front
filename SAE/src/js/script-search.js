let searchTimer;

function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : null;
}

const token = getCookie('token')

document.getElementById('searchbar').addEventListener('input', function () {
    clearTimeout(searchTimer);

    searchTimer = setTimeout(() => {
        const user_search = this.value;
        socket.emit('rechercheUser', { user_search, users_id: [], token });
    }, 300);
});


// Écoutez l'événement 'searchResults' émis par le serveur
socket.on('reponserechercheUser', (results) => {
    console.log(results);
    const resultsContainer = document.getElementById('searchResultsContainer');
    resultsContainer.innerHTML = ''; // Efface les résultats précédents

    // Vérifier si results.response est défini et est un tableau
    if (results.response && Array.isArray(results.response) && results.response.length > 0) {
        const maxResultsToShow = 3; // Définissez le nombre maximal de résultats à afficher initialement

      results.response.slice(0, maxResultsToShow).forEach((user) => {
          // Crée un élément de liste pour chaque utilisateur
          const listItem = document.createElement('li');
          listItem.classList.add('search-result-item');

          // Si une image est disponible, ajoute une balise img à l'élément de liste
          if (user.picture) {
              const userImage = document.createElement('img');
              userImage.src = user.picture;
              userImage.classList.add('user-image');
              listItem.appendChild(userImage);
          }

          // Crée un conteneur div pour le contenu (nom d'utilisateur et autres informations)
          const contentContainer = document.createElement('div');
          contentContainer.classList.add('content-container');

          socket.emit('getProfileData',{token});
          // Crée un élément d'ancrage pour le nom d'utilisateur
          const usernameLink = document.createElement('a');
          socket.once('reponsegetProfileData', (data) => {
          if (data.response.nickname!==user.nickname) {
          usernameLink.href = `/?url=user/${user.nickname}`;
          }else{
          usernameLink.href = `/?url=profil`;
          }
          });  
        // Mettez ici l'URL de la page de profil
        if (user.nickname && /^[a-zA-Z]/.test(user.nickname)) {
            // Mettez la première lettre en majuscule
            const capitalizedNickname = user.nickname.charAt(0).toUpperCase() + user.nickname.slice(1);
            usernameLink.textContent = capitalizedNickname;
        } else {
            usernameLink.textContent = user.nickname;
        }
          usernameLink.classList.add('username');
          contentContainer.appendChild(usernameLink);

          // Ajoute le contenu à l'élément de liste
          listItem.appendChild(contentContainer);

          // Ajoute l'élément de liste à la liste
          resultsContainer.appendChild(listItem);
      });
      if (results.response.length > maxResultsToShow) {
          localStorage.setItem('results', JSON.stringify(results));
          const seeMoreButton = document.createElement('button');
          seeMoreButton.textContent = 'Voir plus';
          seeMoreButton.classList.add('button-see-more');
          seeMoreButton.addEventListener('click', function () {
              window.location.href = '/?url=recherche';
          });
          resultsContainer.appendChild(seeMoreButton);
      }
    } else {
        // Aucun résultat trouvé
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = 'Aucun résultat trouvé.';
        resultsContainer.appendChild(noResultsMessage);
    }
});
