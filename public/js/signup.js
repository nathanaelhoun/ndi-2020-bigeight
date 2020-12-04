document.addEventListener("DOMContentLoaded", function () {
  const inputFirstName = document.getElementById("inputFirstName");
  const inputLastName = document.getElementById("inputLastName");
  const inputEmail = document.getElementById("inputEmail");
  const inputAge = document.getElementById("inputAge");
  const inputPassword = document.getElementById("inputPassword");
  const inputPasswordConf = document.getElementById("inputVerifPassword");
  const btnSubmit = document.getElementById("btnSubmit");

  document
    .getElementById("inscription")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      console.log("signing up");

      const firstname = inputFirstName.value.trim();
      const lastname = inputLastName.value.trim();
      const email = inputEmail.value.trim();
      const age = inputAge.value.trim();
      const pass = inputPassword.value.trim();
      const passConf = inputPasswordConf.value.trim();

      const body = JSON.stringify({
        userFirstName: firstname,
        userLastName: lastname,
        userAge: age,
        userEmail: email,
        userPassword: pass,
        userPasswordConf: passConf,
      });

      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      fetch("./user/signup", {
        method: "POST",
        mode: "cors",
        headers,
        body,
      })
        .then((res) => {
          if (!res.ok) {
            res.json().then((body) => {
              console.error(body);
              document.getElementById("erreur").innerHTML =
                "Impossible de s'inscrire: " + body.code;
            });

            return;
          }

          console.debug("yolo");
          res.text().then((txt) => {
            localStorage.setItem("token", JSON.parse(txt).token);
            localStorage.setItem("email", email);
            document.location.replace("./");
          });
        })
        .catch((err) => {
          console.error(err);
          // Afficher l'erreur
        });
    });
});
