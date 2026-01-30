let form = document.querySelector("#loginForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let username = form.elements[0].value.trim();
  let password = form.elements[1].value.trim();

  // Hardcoded admin credentials
  if (username === "admin" && password === "admin123") {
    // Save admin login session
    localStorage.setItem("loggedInUser", JSON.stringify({ username: "admin", role: "admin" }));
    alert("Admin login successful ✅");
    window.location.href = "home.html";
    return;
  }

  // Normal users from localStorage (optional)
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let matchedUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (matchedUser) {
    // Save user session
    localStorage.setItem("loggedInUser", JSON.stringify({ username: matchedUser.username, role: "user" }));
    alert("Login successful ✅");
    window.location.href = "home.html";
  } else {
    alert("Invalid username or password ❌");
  }
});
