let form = document.querySelector("#registerForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let username = form.elements[0].value;
  let password = form.elements[1].value;
  let cnfPassword = form.elements[2].value;

  if (password !== cnfPassword) {
    alert("Confirm password does not match");
    return;
  }

  let user = {
    username,
    password
  };

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // check if user already exists
  let exists = users.some(u => u.username === username);
  if (exists) {
    alert("User already exists");
    return;
  }

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful 🎉");
  form.reset();
});
