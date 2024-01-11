 document.addEventListener('DOMContentLoaded', function () {
  const likeButtons = document.querySelectorAll('#test');
  console.log('Like buttons:', likeButtons);
  

  for (let i = 0; i < likeButtons.length; i++) {
    const likeButton = likeButtons[i];
    console.log('Setting up click event for button:', likeButton);

    likeButton.addEventListener('click', function () {
      console.log('Button clicked:', likeButton);

      const postId = likeButton.getAttribute('post-id');
      console.log('Post ID:', postId);

      socket.emit('user', { nickname });

      socket.once('reponseuser', function (userdata) {
        console.log('User data:', userdata);

        const user_id = userdata.response._id;
        socket.emit('doILike', { user_id, token, postId });

        socket.once('reponsedoILike', function (LikeData) {
          console.log('Like data:', LikeData);

          const isLiked = LikeData.response.Like;
          console.log('Is liked:', isLiked);

          toggleLike(isLiked, user_id, postId);
        });
      });
    });
  }

  function toggleLike(isLiked, user_id, postId) {
    const likeButton = document.querySelector(`.img-like[data-post-id="${postId}"]`);

    if (isLiked) {
      // Changer l'image du cœur vide en rouge
      socket.emit('dislike', { user_id, token, postId });
      console.log("dislike");
    } else {
      // Changer l'image du cœur rouge en vide
      socket.emit('like', { user_id, token, postId });
      console.log("like");
    }
  }
})