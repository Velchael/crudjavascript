// Obtener referencias a los elementos del formulario y la tabla
const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const tableBody = document.getElementById('tbody');

// Array para almacenar los datos
let data = [];
/////////////////////////////////////////////////////////////////////////////
// Almacenar datos en el localStorage
function saveData() {
    localStorage.setItem('data', JSON.stringify(data));
  }
  
  // Recuperar datos del localStorage
  function loadData() {
    const savedData = localStorage.getItem('data');
    if (savedData) {
      data = JSON.parse(savedData);
    }
  }
  
  // Agregar evento submit al formulario
  form.addEventListener('submit', () => {
    addItem(event);
    saveData();
  });
  
  // Renderizar la tabla inicial y cargar datos almacenados
  loadData();
  renderTable();

// Función para renderizar la tabla
/////////////////////////////////////////////////////////////////////////
function renderTable() {
  tableBody.innerHTML = '';

  data.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.email}</td>
      <td>
        <button onclick="editItem(${index})">Editar</button>
        <button onclick="deleteItem(${index})">Eliminar</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Función para agregar un nuevo item
function addItem(event) {
  event.preventDefault();

  const name = nameInput.value;
  const email = emailInput.value;

  const newItem = {
    name,
    email
  };

  data.push(newItem);

  nameInput.value = '';
  emailInput.value = '';

  renderTable();
}

// Función para editar un item existente
function editItem(index) {
  const item = data[index];
  nameInput.value = item.name;
  emailInput.value = item.email;

  data.splice(index, 1);

  renderTable();
}

// Función para eliminar un item existente
function deleteItem(index) {
  data.splice(index, 1);

  renderTable();
}

// Agregar evento submit al formulario
form.addEventListener('submit', addItem);

// Renderizar la tabla inicial
renderTable();