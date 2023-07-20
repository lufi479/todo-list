import createTask from "./taskCreator";
import createProject from "./projectCreator";

function start(){

    const projectList = [];


    const task1 = createTask("title", "Description", new Date(2023, 7, 1), "low");

    task1.desc = "LMAO NEW DESCRIPTION";

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
        //projForm.classList.add("shown");
        createProjectBtn.classList.add("hidden")
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

        projBtnsContainterDiv.classList.add("hidden");

        card.appendChild(projBtnsContainterDiv);

        card.addEventListener("click", carryOutProjectEvent);

        card.dataset.id = i;

        projectList[i].id = i;

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
    createProjectBtn.classList.remove("hidden")
    }

    display();

    function carryOutProjectEvent(e){
    if (e.target.closest(".edit-project")){
        console.log("edit");
        editProject(e);
    }
    else if (e.target.closest(".delete-project")){
        deleteProject(e);
    }
    else if (e.target.closest(".project") || e.target.closest(".project-name")){
        console.log("lol");
        selectProject(e);
    }
    
    }

    function deleteProject(e){
    let selectedProject = e.currentTarget;
    let id = selectedProject.dataset.id;
    projectList.splice(id, 1);
    display();
    }

    function selectProject(e){
    e.stopPropagation();
    let selected = document.querySelector(".selected-project");
    if (selected){
        selected.classList.remove("selected-project");
        selected.querySelector(".project-buttons-container").classList.add("hidden");
    }
    console.log(e);
    e.target.classList.add("selected-project");
    e.target.querySelector(".project-buttons-container").classList.remove("hidden");
    }

    function editProject(e){
    let selectedProject = e.currentTarget;
    let id = selectedProject.dataset.id;
    //selectedProject.classList.add("hidden");

    selectedProject.removeEventListener("click", carryOutProjectEvent);

    let changeForm = createChangeForm(id);

    let children = selectedProject.children;

    for(let i = 0; i < children.length; i++){
        children[i].classList.add("hidden");
    }

    selectedProject.appendChild(changeForm);

    addChangeFormFunctionality(selectedProject, changeForm, id);

    
    }

    function createChangeForm(id){
    const changeForm = document.createElement("form");
    projForm.action = "#";
    projForm.classList.add("change-project-form");

    const enterNewName = document.createElement("input");
    enterNewName.type = "text";
    enterNewName.id = "proj-name";
    enterNewName.name = "proj-name";
    enterNewName.value = projectList[id].name;

    const changeProj = document.createElement("button");
    changeProj.type = "submit";
    changeProj.id = "submit-change-name";
    changeProj.textContent = "change";

    const cancelChangeProj = document.createElement("button");
    cancelChangeProj.id = "cancel-change-name";
    cancelChangeProj.textContent = "cancel";
    cancelChangeProj.type = "reset";


    changeForm.appendChild(enterNewName);
    changeForm.appendChild(changeProj);
    changeForm.appendChild(cancelChangeProj);
    return changeForm;
    }

    function addChangeFormFunctionality (selectedProject, changeForm, id){
    changeForm.addEventListener("submit", function(e) {
        e.preventDefault();
        let formData = new FormData(this);
        let nameInput = formData.get("proj-name");
        projectList[id].name = nameInput;
        closeChangeForm();
        selectedProject.querySelector(".project-name").textContent = projectList[id].name;
    });

    changeForm.addEventListener("reset", function (e){
        closeChangeForm();
    });

    function closeChangeForm(){
        selectedProject.removeChild(changeForm);
        let children = selectedProject.children;
        for(let i = 0; i < children.length; i++){
        children[i].classList.remove("hidden");
        }
        selectedProject.addEventListener("click", carryOutProjectEvent);
    }
    }
}

export default start;