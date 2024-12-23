// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCetRQqTMEVaoNjMZal8c02OzwtR6QqbPw",
  authDomain: "tonminer-5f14c.firebaseapp.com",
  projectId: "tonminer-5f14c",
  storageBucket: "tonminer-5f14c.firebasestorage.app",
  messagingSenderId: "313508121395",
  appId: "1:313508121395:web:679ca9cf1148e9471b8c46",
  measurementId: "G-EGBCB1L7PR"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("loginForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault();  // Prevent form submission
        console.log("Form submitted"); // Debug message

        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var errorMessage = document.getElementById("errorMessage");

        console.log("Email: " + email); // Debug message
        console.log("Password: " + password); // Debug message

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                alert("Login successful!");
                errorMessage.textContent = "";
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMsg = error.message;
                errorMessage.textContent = "Error: " + errorMsg;
            });
    });
});
