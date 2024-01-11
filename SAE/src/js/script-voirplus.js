// Sur la nouvelle page
document.addEventListener('DOMContentLoaded', function () {
    const storedResults = localStorage.getItem('results');

    if (storedResults) {
        try {
            const results = JSON.parse(storedResults);

            if (results.response && Array.isArray(results.response)) {
                // Affichez tous les résultats sur la nouvelle page
                displayResults(results.response);
            } else {
                throw new Error('Les résultats ne sont pas au format attendu.');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération et du traitement des résultats:', error);
            displayNoResultsMessage();
        }
    } else {
        // Aucun résultat trouvé
        displayNoResultsMessage();
    }
});

function displayResults(results) {
    const resultsContainer = document.querySelector('.recherche-list');

    results.forEach((user) => {
        // Crée un élément d'ancrage pour le nom d'utilisateur
        const usernameLink = document.createElement('a');

        // Crée un élément de liste pour chaque utilisateur
        const listItem = document.createElement('li');
        listItem.classList.add('recherche-result-item'); // Ajoutez la classe au li

        // Si une image est disponible, ajoute une balise img à l'élément de liste
        if (user.picture) {
            const userImage = document.createElement('img');
            userImage.src = user.picture;
            userImage.alt = 'Image de profil'; // Ajoutez une description appropriée si nécessaire
            userImage.classList.add('recherche-image');
            listItem.appendChild(userImage);
        }

        // Crée un span pour le texte (le nom d'utilisateur)
        const usernameSpan = document.createElement('span');

        // Mettez la première lettre du nickname en majuscule
        const capitalizedNickname = user.nickname.charAt(0).toUpperCase() + user.nickname.slice(1);

        // Le nickname est vide ou ne commence pas par une lettre, utilisez-le tel quel
        usernameSpan.textContent = capitalizedNickname;

        // Ajoute le span à l'élément de liste
        listItem.appendChild(usernameSpan);

        // Émettre une requête socket pour obtenir les données du profil
        socket.emit('getProfileData', { token });

        // Attendez la réponse du socket
        socket.once('reponsegetProfileData', (data) => {
            if (data.response.nickname !== user.nickname) {
                usernameLink.href = `/?url=user/${user.nickname}`;
            } else {
                usernameLink.href = `/?url=profil`;
            }

            // Ajoute l'élément de liste à l'élément ancre
            usernameLink.appendChild(listItem);

            // Ajoute l'élément ancre à la liste
            resultsContainer.appendChild(usernameLink);
        });
    });
}

// Fonction pour afficher un message en l'absence de résultats
function displayNoResultsMessage() {
    const resultsContainer = document.querySelector('.recherche-list');

    // Aucun résultat trouvé
    const noResultsMessage = document.createElement('p');
    noResultsMessage.textContent = 'Aucun résultat trouvé.';
    resultsContainer.appendChild(noResultsMessage);
}