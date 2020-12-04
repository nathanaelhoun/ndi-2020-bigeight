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

    console.log(body);
    fetch("./user/login", {
      method: "POST",
      mode: "cors",
      headers,
      body,
    })
      .then((res) => {
        if (!res.ok) {
          console.error(res);
          document.getElementById("erreur").innerHTML =
            "L'adresse mail ou le mot de passe n'est pas correct";
          return;
        }

        res.text().then((txt) => {
          localStorage.setItem("token", JSON.parse(txt).token);
          document.location.replace("./");
        });
      })
      .catch((err) => {
        console.error(err);
        document.getElementById("erreur").innerHTML =
          "Erreur technique lors de la connexion";
      });
  });
});
