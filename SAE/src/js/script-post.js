/* Posts */

const numberOfPosts = 2;


const cardContainer = document.getElementById('cardContainer');


function generateCard(postNumber) {
    const card = document.createElement('div');
    card.className = 'card';

    const Infos = document.createElement('div');
    Infos.className = 'Infos';
  
    const leftSide = document.createElement('div');
    leftSide.className = 'left-side';

    const rightSide = document.createElement('div');
    rightSide.className = 'right-side';

   
    const image = document.createElement('img');
    image.src = 'includes/Test.png'; 
    image.className = 'imgMain';
    card.appendChild(image);

  const user = document.createElement('h3');
    user.className = 'user';
    user.innerHTML = `
      <div class="titre"><img src="includes/humain.png" class="imgHumainMain"> Nicolas Delevingue</div>
      `;

    leftSide.appendChild(user);

    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = 'Portrait réalisé à Beauvais le mois dernier par ma compagne. Je ne cherche pas à me montrer, mon objectif à travers cette photo est de motiver les personnes autours de moi à développer leur confiance en eux.';
    leftSide.appendChild(description);

    const ownerInfo = document.createElement('div');
    ownerInfo.className = 'owner-info';
    ownerInfo.innerHTML = `
        <h5 class="titreInfoPost" ><img src="includes/dl.png" class="imgHumain"> Nicolas Delevingue</h5>
        <div class="containerPostPrix">
          <img src="includes/MatriceCoin.png" class="imgPostMoney">
          <span class="textPrixPost">1100</span>
          <img src="includes/buy.png" class="imgBuy">
        </div>
        
    `;
    rightSide.appendChild(ownerInfo);

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
  compteurLike.textContent= `1000`;
  compteurLike.style.fontSize = `20px`;
  actionButtons.appendChild(compteurLike);
  

  const partage = document.createElement('img');
  partage.src = 'includes/partage.png';
  partage.className = 'img-partage';
  actionButtons.appendChild(partage); 

  rightSide.appendChild(actionButtons);
  
  Infos.appendChild(leftSide);
  Infos.appendChild(rightSide);

  card.appendChild(Infos);
    return card;
}

for (let i = 1; i <= numberOfPosts; i++) {
    const card = generateCard(i);
    cardContainer.appendChild(card);
}

