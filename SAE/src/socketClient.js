const socket = io('http://localhost:5000');

// Écoutez les réponses de l'API

socket.on('reponseAPI', (response) => {
    console.log('Réponse de l\'API:', response.response,response.statusCode,response.message);
});



// Fonction pour émettre des données avec un événement associé
function emitData(eventName, data) {
    socket.emit(eventName, data);
}

// Define data objects for different events
const eventData = {
    connexion: {
        mail: "user@exemple.com",
        password: "hashed_password"
    },
    user: {
        nickname: "user"
    },
    creationUser: {
        nickname: "user123",
        mail: "user0123@exemple.com",
        password: "hashed_password",
        lastname: "user",
        firstname: "user",
        birthday: "1905-05-01"
    },
    follow: {
        user_id: "655b640f5df425d2639e0808",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTViNjQwZjVkZjQyNWQyNjM5ZTA4MDgiLCJtYWlsIjoidXNlckBleGVtcGxlLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA4JDI3dVhZVUpiVUc4b0ZpRW43cFFQOC5qWGYzOGtLeVZzMHp5OXNKL2psQUZOamIuMGFxcUYyIiwiaWF0IjoxNzAwNTY1OTk0fQ.utzt6dLCZj6aIPWBpjGicnpCL1B4nOW6nn9jx7YNoFM"
    },
    unfollow: {
        user_id: "655b640f5df425d2639e0808",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTViNjQwZjVkZjQyNWQyNjM5ZTA4MDgiLCJtYWlsIjoidXNlckBleGVtcGxlLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA4JDI3dVhZVUpiVUc4b0ZpRW43cFFQOC5qWGYzOGtLeVZzMHp5OXNKL2psQUZOamIuMGFxcUYyIiwiaWF0IjoxNzAwNTY1OTk0fQ.utzt6dLCZj6aIPWBpjGicnpCL1B4nOW6nn9jx7YNoFM"
    },
    changePassword: {
        password: "hashed_password",
        newpassword: "hashed_password",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTViNjQwZjVkZjQyNWQyNjM5ZTA4MDgiLCJtYWlsIjoidXNlckBleGVtcGxlLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA4JHFpSHM2ek5VbFc5SmV6eUJJRGZnRWVHazQxS2FYcjMyRnZWRXU3TnEvbEdIOG9kRGpJVDY2IiwiaWF0IjoxNzAwNDk1ODQ0fQ.yiJbOFi3g_ufMTQNQBl9nr1M8WohjAjwnKNuBOgoVLI"
    },
    updateProfil: {
        picture: "sdsds",
        bio: "Je suis très beau.",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTViNjQwZjVkZjQyNWQyNjM5ZTA4MDgiLCJtYWlsIjoidXNlckBleGVtcGxlLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA4JDI3dVhZVUpiVUc4b0ZpRW43cFFQOC5qWGYzOGtLeVZzMHp5OXNKL2psQUZOamIuMGFxcUYyIiwiaWF0IjoxNzAwNDk4ODk1fQ.sMZFsLo41U16sZedLiVsZwi5A3-hyOujZVJD3HxyU8Y"
    },
    post: {
        post_id: "655cb4d3b2dd4143421d1a3b"
    },
    createPost: {
        motherId: null,
        picture: null,
        description: null,
        tags: ["tag1", "tag2"],
        buy: false,
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTViNjQwZjVkZjQyNWQyNjM5ZTA4MDgiLCJtYWlsIjoidXNlckBleGVtcGxlLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA4JDI3dVhZVUpiVUc4b0ZpRW43cFFQOC5qWGYzOGtLeVZzMHp5OXNKL2psQUZOamIuMGFxcUYyIiwiaWF0IjoxNzAwNTY1OTk0fQ.utzt6dLCZj6aIPWBpjGicnpCL1B4nOW6nn9jx7YNoFM"
    },
};

// Emit events using the function
Object.entries(eventData).forEach(([eventName, data]) => {
    emitData(eventName, data);
});
