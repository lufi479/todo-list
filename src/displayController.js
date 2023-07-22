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

    function display(){
        displayProjects();
        displayTasks();
    }

    function displayProjects() {
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
        createProjectBtn.classList.remove("hidden");
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

    function selectProject(e){
        e.stopPropagation();
        let selected = document.querySelector(".selected-project");
        if (selected){
            selected.classList.remove("selected-project");
            selected.querySelector(".project-buttons-container").classList.add("hidden");
        }
        e.target.classList.add("selected-project");
        e.target.querySelector(".project-buttons-container").classList.remove("hidden");
        displayTasks();
    }

    function displayTasks(){
        let taskContainer = document.querySelector(".task-container");
        taskContainer.textContent = ""

        let selectedProject = document.querySelector(".selected-project");
        if (!selectedProject){
            return;
        }

        let projectData = projectList[selectedProject.dataset.id];
        
        let taskList = projectData.taskList;

        for (let i = 0; i < taskList.length; i++){
            let taskDiv =document.createElement("div");
            taskDiv.classList.add("task");
            
            let titleDiv = document.createElement("div");
            titleDiv.classList.add("task-title");
            titleDiv.textContent = taskList[i].title;

            taskDiv.appendChild(titleDiv);

            taskContainer.appendChild(taskDiv);
        }

        let createTaskBtn = document.createElement("button");
        createTaskBtn.classList.add("create-task-btn");
        createTaskBtn.textContent = "+";

        let taskButtonContainer = document.createElement("div");
        taskButtonContainer.classList.add("task-btn-container");

        taskButtonContainer.appendChild(createTaskBtn);

        taskContainer.appendChild(taskButtonContainer);

        createTaskBtn.addEventListener("click", function(e){
            let disableClicks = document.createElement("div");
            disableClicks.classList.add("disable-other-clicks");
            let newTaskForm = createNewTaskForm();
            let newTaskHeader = document.createElement("div");
            newTaskHeader.classList.add("new-task-form-header");
            newTaskHeader.textContent = "New Task";
            newTaskForm.insertBefore(newTaskHeader, newTaskForm.firstChild);
            disableClicks.appendChild(newTaskForm);
            //taskContainer.appendChild(createNewTaskForm());
            document.querySelector("body").appendChild(disableClicks);

            document.querySelector(".new-task-form").addEventListener("submit", function(e){
                e.preventDefault();
                let formData = new FormData(this);
                let titleInput = formData.get("task-title");
                let descInput = formData.get("task-desc");
                let priorityInput = formData.get("task-priority");
                let dateInput = formData.get("task-due-date");
                let currentProject = document.querySelector(".selected-project");
                projectList[currentProject.dataset.id].addTask(createTask(titleInput, descInput, priorityInput, dateInput));
                removeTaskForm();
                displayTasks();
            });
    
            document.querySelector("#cancel-new-task").addEventListener("click", function(e){
                removeTaskForm();
            })
        });
    }

    function removeTaskForm(){
        let formAndBackground = document.querySelector(".disable-other-clicks");
        formAndBackground.remove();
    }

    function createNewTaskForm(){
        let newTaskForm = document.createElement("form");
        newTaskForm.classList.add("new-task-form");

        let titleLabel = document.createElement("label");
        titleLabel.for = "task-title";
        titleLabel.textContent = "Title:";

        let taskTitle = document.createElement("input");
        taskTitle.classList.add("new-task-title-input");
        taskTitle.type = "text";
        taskTitle.id = "task-title";
        taskTitle.name = "task-title";

        let descLabel = document.createElement("label");
        descLabel.for = "task-desc";
        descLabel.textContent = "Description:";

        let taskDesc = document.createElement("textarea");
        taskDesc.classList.add("new-task-desc-input");
        taskDesc.id = "task-desc";
        taskDesc.name = "task-desc";

        let priorityLabel = document.createElement("label");
        priorityLabel.for = "task-priority";
        priorityLabel.textContent = "Priority:"

        let taskPriority = document.createElement("select");
        taskPriority.classList.add("new-task-priority-drop-down");
        taskPriority.id = "task-priority";
        taskPriority.name = "task-priority";

        let optArray = ["Low", "Medium", "High"];

        for (let i = 0; i < optArray.length; i++){
            let option = document.createElement("option");
            option.textContent = optArray[i];
            option.value = optArray[i];
            option.classList.add("priority-option");

            taskPriority.appendChild(option);
        }

        let dateLabel = document.createElement("label");
        dateLabel.for = "task-due-date";;
        dateLabel.textContent = "Date:"

        let taskDueDate = document.createElement("input");
        taskDueDate.classList.add("new-task-due-date-input");
        taskDueDate.type = "date";
        taskDueDate.id = "task-due-date";
        taskDueDate.name = "task-due-date";

        let submitNewTask = document.createElement("button");
        submitNewTask.id ="submit-new-task";
        submitNewTask.textContent = "add";
        submitNewTask.type = "submit";

        let cancelNewTask = document.createElement("button");
        cancelNewTask.id = "cancel-new-task";
        cancelNewTask.textContent = "cancel";
        cancelNewTask.type  = "reset";

        let buttonDiv = document.createElement("div");
        buttonDiv.classList.add("task-form-btns-container");

        buttonDiv.appendChild(submitNewTask);
        buttonDiv.appendChild(cancelNewTask);

        newTaskForm.appendChild(titleLabel);
        newTaskForm.appendChild(taskTitle);
        newTaskForm.appendChild(descLabel);
        newTaskForm.appendChild(taskDesc);
        newTaskForm.appendChild(priorityLabel);
        newTaskForm.appendChild(taskPriority);
        newTaskForm.appendChild(dateLabel);
        newTaskForm.appendChild(taskDueDate);
        newTaskForm.appendChild(buttonDiv);
        //newTaskForm.appendChild(submitNewTask);
        //newTaskForm.appendChild(cancelNewTask);

        return newTaskForm;
    }
}

export default start;