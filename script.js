document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("loginForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault();  // Prevent form submission

        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var errorMessage = document.getElementById("errorMessage");

        if (email === "test@example.com" && password === "password") {
            alert("Login successful!");
            errorMessage.textContent = "";
        } else {
            errorMessage.textContent = "Invalid email or password";
        }
    });
});
