async function boutique() {
  return new Promise((resolve) => {
    socket.emit('rankGet', {});
    socket.once('reponserankGet', function(data) {
      resolve(data);
    });
  });
}
// Fonction pour émettre un événement avec des données spécifiques après confirmation
function emitEventWithId(id, rank_id) {
  const element = document.getElementById(id);
  if (element) {
    element.addEventListener('click', () => {
      const confirmation = window.confirm("Êtes-vous sûr de vouloir acheter ce rang?");
      if (confirmation) {
        socket.emit('rankBuy', { rank_id, token });
      }
    });
  }
}



document.addEventListener('DOMContentLoaded', async () => {
  if (token) {
    socket.emit('getProfileData', { token });

    socket.on('reponsegetProfileData', (profileData) => {
      document.querySelector('.Coins').innerText = `Matrice Coins: ${profileData.response.coins}`;
    });
  }
  
  
  const rankResponce = await boutique();
  const ranklist = rankResponce.response;
  console.log(ranklist[0]._id);
  // Appeler la fonction pour chaque div avec un ID spécifique
  emitEventWithId('Novice', ranklist[0]._id);
  emitEventWithId('Explorateur', ranklist[1]._id);
  emitEventWithId('Connaisseur', ranklist[2]._id);
  emitEventWithId('Influenceur', ranklist[3]._id);
  emitEventWithId('Maestro', ranklist[4]._id);
  emitEventWithId('Hype',ranklist[5]._id);
});


