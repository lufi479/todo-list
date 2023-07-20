import createTask from "./taskCreator";
import createProject from "./projectCreator";

const task1 = createTask("title", "Description", new Date(2023, 7, 1), "low");


task1.desc = "LMAO NEW DESCRIPTION";


const projectList = [];

const proj1 = createProject("project 1");
projectList.push(proj1);
proj1.addTask(task1);

proj1.addTask(createTask("Task2", "Desc 2", new Date(2023,7,7), "high"));

const containerDiv = document.querySelector(".container");

const createProjectBtn = document.querySelector("#create-project");

const projForm = document.createElement("form");
projForm.action = "#";
projForm.classList.add("project-form");

const enterName = document.createElement("input");
enterName.type = "text";
enterName.id = "proj-name";
enterName.name = "proj-name";



const submitProj = document.createElement("button");
submitProj.type = "submit";
submitProj.id = "submit-proj-form";
submitProj.textContent = "submit";

const cancelProj = document.createElement("button");
cancelProj.id = "cancel-new-project";
cancelProj.textContent = "cancel";
cancelProj.type = "reset";


projForm.appendChild(enterName);
projForm.appendChild(submitProj);
projForm.appendChild(cancelProj);

projForm.classList.add("hidden");

document.querySelector(".project-section").appendChild(projForm);


createProjectBtn.addEventListener("click", function(e) {
    projForm.classList.remove("hidden");
    projForm.classList.add("shown");
})

function display () {
  const projListDiv = document.querySelector(".project-list");
  projListDiv.textContent = "";
  console.log(projectList);
  for (let i = 0; i < projectList.length; i++){
    let card = document.createElement("div");
    card.classList.add("project");

    let projName = document.createElement("div");
    projName.classList.add("project-name");
    projName.textContent = projectList[i].name;
    card.appendChild(projName);

    let projBtnsContainterDiv = document.createElement("div");
    projBtnsContainterDiv.classList.add("project-buttons-container");

    let editDiv = document.createElement("div");
    editDiv.classList.add("edit-project");
    projBtnsContainterDiv.appendChild(editDiv);

    let deleteDiv = document.createElement("div");
    deleteDiv.classList.add("delete-project");
    projBtnsContainterDiv.appendChild(deleteDiv);

    card.appendChild(projBtnsContainterDiv);

    card.addEventListener("click", selectProject);

    projListDiv.appendChild(card);
  }
};

projForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let formData = new FormData(this);
    let nameInput = formData.get("proj-name");
    let tempProj = createProject(nameInput);
    projectList.push(tempProj);
    closeForm();
    display();
});

cancelProj.addEventListener("click", function (e){
  closeForm();
});

function closeForm() {
  projForm.classList.remove("shown");
  projForm.classList.add("hidden");
  projForm.reset();
}

display();

function selectProject(e){
  let selected = document.querySelector(".selected-project");
  if (selected){
    selected.classList.remove("selected-project");
  }
  console.log(e);
  e.target.classList.add("selected-project");
}
