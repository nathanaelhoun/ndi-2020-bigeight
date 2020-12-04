document.addEventListener("DOMContentLoaded", function () {
  const inputFirstName = document.getElementById("inputFirstName");
  const inputLastName = document.getElementById("inputLastName");
  const inputEmail = document.getElementById("inputEmail");
  const inputAge = document.getElementById("inputAge");
  const inputPassword = document.getElementById("inputPassword");
  const inputPasswordConf = document.getElementById("inputVerifPassword");
  const btnSubmit = document.getElementById("btnSubmit");

  btnSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("click");
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

    fetch("/user/signup", {
      method: "POST",
      mode: "cors",
      headers,
      body,
    })
      .then((res) => {
        res.text().then((txt) => {
          localStorage.setItem("token", JSON.parse(txt).token);
        });
      })
      .catch((err) => {
        console.error(err);
        // Afficher l'erreur
      });
  });
});
