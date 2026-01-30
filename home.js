let form = document.querySelector("#employeeForm");
let tbody = document.querySelector("#tbody");

let filterDepartment = document.querySelector("#filter-department");
let filterPerformance = document.querySelector("#filter-performance");
let sortSelect = document.querySelector("#sort");
let resetBtn = document.querySelector("#reset");

let employees = JSON.parse(localStorage.getItem("employees")) || [];
let filteredEmployees = [...employees];

renderTable(filteredEmployees);

/* ---------- FORM SUBMIT ---------- */
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let employee = {
    name: form.elements[0].value.trim(),
    email: form.elements[1].value.trim(),
    mobile: form.elements[2].value.trim(),
    salary: Number(form.elements[3].value),
    department: form.elements[4].value,
    rating: form.elements[5].value
  };

  employees.push(employee);
  localStorage.setItem("employees", JSON.stringify(employees));

  applyFiltersAndSort();
  form.reset();
});

/* ---------- RENDER TABLE ---------- */
function renderTable(data) {
  tbody.innerHTML = "";

  data.forEach((emp, index) => {
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

/* ---------- VIEW MORE ---------- */
function viewMore(index) {
  let emp = filteredEmployees[index];
  alert(
`Name: ${emp.name}
Email: ${emp.email}
Mobile: ${emp.mobile}
Salary: ${emp.salary}
Department: ${emp.department}
Performance: ${emp.rating}`
  );
}

/* ---------- FILTER & SORT ---------- */
filterDepartment.addEventListener("change", applyFiltersAndSort);
filterPerformance.addEventListener("change", applyFiltersAndSort);
sortSelect.addEventListener("change", applyFiltersAndSort);

function applyFiltersAndSort() {
  filteredEmployees = [...employees];

  // Filter Department
  if (filterDepartment.value) {
    filteredEmployees = filteredEmployees.filter(
      emp => emp.department === filterDepartment.value
    );
  }

  // Filter Performance
  if (filterPerformance.value) {
    filteredEmployees = filteredEmployees.filter(
      emp => emp.rating === filterPerformance.value
    );
  }

  // Sorting
  switch (sortSelect.value) {
    case "salary-asc":
      filteredEmployees.sort((a, b) => a.salary - b.salary);
      break;

    case "salary-desc":
      filteredEmployees.sort((a, b) => b.salary - a.salary);
      break;

    case "name-asc":
      filteredEmployees.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case "name-desc":
      filteredEmployees.sort((a, b) => b.name.localeCompare(a.name));
      break;
  }

  renderTable(filteredEmployees);
}

/* ---------- RESET ---------- */
resetBtn.addEventListener("click", function () {
  filterDepartment.value = "";
  filterPerformance.value = "";
  sortSelect.value = "";

  filteredEmployees = [...employees];
  renderTable(filteredEmployees);
});
