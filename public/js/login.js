$(document).ready(function() {
    var loginForm = $("form.login");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");

    loginForm.on("submit", function(event) {
        event.preventDefault();
        var userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }

        loginUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
    });

    function loginUser(email, password) {
        $.post("/api/login", {
            email: email,
            password: password
        })
        .then(function() {
            window.location.replace("/members");
        })
        .catch(handleLoginErr);
    }
    function handleLoginErr(err) {
        if (err) {
            const errTxt = "Email/Password not valid";
            $("#alert .msg").text(errTxt);
        }
        $("#alert").fadeIn(500);
        console.log(err.responseJSON);
    }
});