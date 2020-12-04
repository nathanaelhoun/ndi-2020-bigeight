document.addEventListener("DOMContentLoaded", function () {
  const inputEmail = document.getElementById("inputEmail");
  const inputPassword = document.getElementById("inputPassword");
  const btnSubmit = document.getElementById("btnSubmit");

  btnSubmit.addEventListener("click", function (e) {
    e.preventDefault();

    const body = JSON.stringify({
      userEmail: inputEmail.value.trim(),
      userPassword: inputPassword.value.trim(),
    });

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    fetch("./user/login", {
      method: "POST",
      mode: "cors",
      headers,
      body,
    })
      .then((res) => {
        res.text().then((txt) => {
          localStorage.setItem("token", JSON.parse(txt).token);
        });
        document.location.replace("./");
      })
      .catch((err) => {
        console.error(err);
        // Afficher l'erreur
      });
  });
});
