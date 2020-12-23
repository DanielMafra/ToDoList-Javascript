// LIST ELEMENTS
const newTaskButton = document.getElementById("save");
const newTaskInput = document.getElementById("task");

const tasksArea = document.getElementById("tasks");

const buttonClearCompleteds = document.getElementById("clear-completeds");

const buttonAll = document.getElementById("all");
const buttonActive = document.getElementById("active");
const buttonCompleted = document.getElementById("completed");

const buttonClearAll = document.getElementById("clear-all");

let i = 0;
let j = 0;
let k = 0;
let l = 0;
let m = 0;

// TASKS ARRAY
let tasks = [];

// ACTIVE INPUT
newTaskInput.addEventListener("input", _ => {
  if (newTaskInput.value.length > 0) {
    newTaskButton.disabled = false;
    newTaskButton.classList.add("active-save");
    newTaskButton.innerHTML = `<i style="color: #FFFFFF;" class="fas fa-check"></i>`;
  } else {
    newTaskButton.disabled = true;
    newTaskButton.classList.remove("active-save");
    newTaskButton.innerHTML = "";
  }
});

// SUBMIT INPUT
function save() {
  tasks.unshift({
    task: newTaskInput.value,
    completed: false
  });
  newTaskButton.disabled = true;
  newTaskButton.classList.remove("active-save");
  newTaskButton.innerHTML = "";
  newTaskInput.value = "";
  saveLocal();
  searchLocal();
}

// SAVE IN LOCAL STORAGE
async function saveLocal() {
  await localStorage.setItem("tasks", JSON.stringify(tasks));
}

// SEARCH IN LOCAL STORAGE
async function searchLocal() {
  if (localStorage.getItem("tasks") != null && localStorage.getItem("tasks") != undefined) {
    tasks = JSON.parse(await localStorage.getItem("tasks"));
    createList();
  }
}

searchLocal();

// CREATE LIST
function createList() {
  tasksArea.innerHTML = "<ul id='list'></ul>";

  for (i = 0; i < tasks.length; i++) {
    document.getElementById("list").innerHTML += `<li id="${i}" class='item-list'><div class="btn-task"><button class="check-btn" onclick="check(${i})"><i style="color: #63E2DB;" class="fas fa-check"></i></button>${tasks[i].task}</div><button class="remove-btn" onclick="remove(${i})"><i class="delete fas fa-times"></i></button></li><hr>`
    if (tasks[i].completed) {
      document.getElementById(`${i}`).classList.add("done");
    }
    buttonAll.disabled = false;
    buttonActive.disabled = false;
    buttonCompleted.disabled = false;
    buttonAll.classList.add("op-active");
    buttonActive.classList.remove("op-active");
    buttonCompleted.classList.remove("op-active");
  }

  let totalActive = tasks.length;
  tasksArea.innerHTML += "<div id='pendents'></div>";
  document.getElementById("pendents").innerHTML = `<p>${totalActive} tarefas restantes</p>`;

  for (j = 0; j < tasks.length; j++) {
    if (tasks[j].completed) {
      totalActive = totalActive - 1;
      tasksArea.innerHTML += "<div id='pendents'></div>";
      document.getElementById("pendents").innerHTML = `<p>${totalActive} tarefas restantes</p>`;
    }
  }
}

// CHECK TASK
function check(id) {

  if (!tasks[id].completed) {
    tasks[id].completed = true;
    saveLocal();
    searchLocal();
  } else {
    tasks[id].completed = false;
    saveLocal();
    searchLocal();
  }
}

// REMOVE TASK
async function remove(id) {
  tasks.splice(id, 1);
  if (tasks == null || tasks == undefined || tasks == "") {
    await localStorage.removeItem('tasks');
    tasks = [];
    tasksArea.innerHTML = "<p class='clean'>Nenhuma tarefa cadastrada</p>";
  } else {
    saveLocal();
    searchLocal();
  }
}

async function removeAll() {
  await localStorage.removeItem('tasks');
  tasks = [];
  tasksArea.innerHTML = "<p class='clean'>Nenhuma tarefa cadastrada</p>";
}

// FILTER TASKS
function nav(type) {
  switch (type) {
    case "all":
      createList();
      break;
    case "active":
      document.getElementById("list").innerHTML = "";
      buttonAll.classList.remove("op-active");
      buttonActive.classList.add("op-active");
      buttonCompleted.classList.remove("op-active");
      for (k = 0; k < tasks.length; k++) {
        if (!tasks[k].completed) {
          document.getElementById("list").innerHTML += `<li id="${k}" class='item-list'><div class="btn-task"><button class="check-btn" onclick="check(${k})"><i style="color: #63E2DB;" class="fas fa-check"></i></button>${tasks[k].task}</div><button class="remove-btn" onclick="remove(${k})"><i class="delete fas fa-times"></i></button></li><hr>`
        }
      }
      break;
    case "completed":
      document.getElementById("list").innerHTML = "";
      buttonAll.classList.remove("op-active");
      buttonActive.classList.remove("op-active");
      buttonCompleted.classList.add("op-active");
      for (l = 0; l < tasks.length; l++) {
        if (tasks[l].completed) {
          document.getElementById("list").innerHTML += `<li id="${l}" class='item-list'><div class="btn-task"><button class="check-btn" onclick="check(${l})"><i style="color: #63E2DB;" class="fas fa-check"></i></button>${tasks[l].task}</div><button class="remove-btn" onclick="remove(${l})"><i class="delete fas fa-times"></i></button></li><hr>`;
          document.getElementById(`${l}`).classList.add("done");
        }
      }
      break;
  }

}