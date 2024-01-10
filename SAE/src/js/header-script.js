document.addEventListener('DOMContentLoaded', function () {
    // Vérifier si le token est présent dans les cookies
    const token = getCookie('token');

    // Si un token est présent, rediriger vers la page d'accueil
    if (token && window.location.href.indexOf('?url=connexion') !== -1) {
        window.location.href = '?url=accueil';
        return;
    }

    // Sélectionner le bouton Connexion/Inscription
    const connexionButton = document.getElementById('connexionInscription');

    if (token) {
        // Si un token est présent, changer le texte et le lien du bouton
        connexionButton.innerHTML = '<button class="rounded-button connexionBouton">Profil</button>';
        connexionButton.href = '?url=profil';

        // Ajouter le bouton de déconnexion à la navhover
        const navHover = document.querySelector('.navHover');
        const deconnexionButton = document.createElement('li');
        deconnexionButton.innerHTML = '<a href="#" onclick="deconnexion()">Déconnexion</a>';
        navHover.appendChild(deconnexionButton);
    }
});

// Fonction pour récupérer la valeur d'un cookie par son nom
function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : null;
}

// Fonction pour supprimer le cookie de déconnexion
function deconnexion() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Ajoutez d'autres opérations de déconnexion si nécessaire
    window.location.href = '?url=accueil';  // Redirige vers la page d'accueil après la déconnexion
}
