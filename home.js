let form = document.querySelector("#employeeForm");
let tbody = document.querySelector("#tbody");

let employees = JSON.parse(localStorage.getItem("employees")) || [];
renderTable();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let employee = {
    name: form.elements[0].value,
    email: form.elements[1].value,
    mobile: form.elements[2].value,
    salary: form.elements[3].value,
    department: form.elements[4].value,
    rating: form.elements[5].value
  };

  employees.push(employee);
  localStorage.setItem("employees", JSON.stringify(employees));

  renderTable();
  form.reset();
});

function renderTable() {
  tbody.innerHTML = "";

  employees.forEach((emp, index) => {
    let tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${emp.name}</td>
      <td>${emp.email}</td>
      <td>${emp.department}</td>
      <td><button onclick="viewMore(${index})">View</button></td>
    `;

    tbody.appendChild(tr);
  });
}

function viewMore(index) {
  let emp = employees[index];
  alert(`
Name: ${emp.name}
Email: ${emp.email}
Mobile: ${emp.mobile}
Salary: ${emp.salary}
Department: ${emp.department}
Rating: ${emp.rating}
  `);
}
