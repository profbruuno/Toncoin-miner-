document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("loginForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault();  // Prevent form submission

        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var errorMessage = document.getElementById("errorMessage");

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
