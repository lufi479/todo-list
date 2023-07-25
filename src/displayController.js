import createTask from "./taskCreator";
import createProject from "./projectCreator";
import { format } from "date-fns";

function start(){

    let projectList = [];


    // Checks if localStorage exists and does the necessary tasks depending
    // on the result
    if (localStorage.getItem('data') === null){
        const task1 = createTask("title", "Description", new Date(2023, 7, 1), "Low");
        const proj1 = createProject("project 1");
        projectList.push(proj1);
        proj1.addTask(task1);
    }
    else{
        const dataStorage = JSON.parse(localStorage.getItem('data'));
        for (let i = 0; i < dataStorage.length; i++){
            let tempProj = createProject(dataStorage[i].name);
            for (let j = 0; j < dataStorage[i].taskList.length; j++){
                tempProj.addTask(dataStorage[i].taskList[j]);
            }
            projectList.push(tempProj);
        }
    }

    //Creates the button for creating a new project and the form that 
    // the user inputs
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
        createProjectBtn.classList.add("hidden")
    });

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



    function display(){
        displayProjects();
        displayTasks();
    }

    //Displays all of the projects on the projects list
    function displayProjects() {
        localStorage.setItem('data', JSON.stringify(projectList));
        const projListDiv = document.querySelector(".project-list");
        projListDiv.textContent = "";
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
            editDiv.classList.add("edit", "edit-project");
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

    //Checks which part of the project you clicked and calls the necessary function;
    function carryOutProjectEvent(e){
        if (e.target.closest(".edit-project")){
            editProject(e);
        }
        else if (e.target.closest(".delete-project")){
            deleteProject(e);
        }
        else if (e.target.closest(".project") || e.target.closest(".project-name")){
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

    // Performs the functionality on the form that changes the project's name
    function addChangeFormFunctionality (selectedProject, changeForm, id){
        changeForm.addEventListener("submit", function(e) {
            e.preventDefault();
            let formData = new FormData(this);
            let nameInput = formData.get("proj-name");
            projectList[id].name = nameInput;
            closeChangeForm();
            selectedProject.querySelector(".project-name").textContent = projectList[id].name;
            displayTasks();
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

    //Performs the functionality when you select a project
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
        localStorage.setItem('data', JSON.stringify(projectList));
        let taskContainer = document.querySelector(".task-container");
        taskContainer.textContent = ""

        let selectedProject = document.querySelector(".selected-project");
        if (!selectedProject){
            return;
        }

        let projectData = projectList[selectedProject.dataset.id];
        
        let taskList = projectData.taskList;


        // Creates the DOM elements for the tasks and adds them to the DOM
        for (let i = 0; i < taskList.length; i++){
            let taskDiv =document.createElement("div");
            taskDiv.classList.add("task");
            
            let titleDiv = document.createElement("div");
            titleDiv.classList.add("task-title");
            titleDiv.textContent = taskList[i].title;

            let completionCheckDiv = document.createElement("div");
            completionCheckDiv.classList.add("checkbox");
            if (taskList[i].completed){
                completionCheckDiv.classList.add("completed");
            }

            completionCheckDiv.addEventListener("click", function(e){
                taskList[i].completed = !taskList[i].completed;
                if (taskList[i].completed){
                    
                    completionCheckDiv.classList.add("completed");
                }
                else{
                    completionCheckDiv.classList.remove("completed");
                }
            });

            let dateDiv = document.createElement("div");
            dateDiv.classList.add("task-date");
            dateDiv.textContent = taskList[i].dueDate;

            let priorityDiv = document.createElement("div");
            priorityDiv.classList.add("task-priority");
            priorityDiv.textContent = taskList[i].priority;
            if (taskList[i].priority === "Low"){
                priorityDiv.classList.add("low-priority");
                priorityDiv.textContent = "low";
            }
            else if (taskList[i].priority === "Medium"){
                priorityDiv.classList.add("medium-priority");
                priorityDiv.textContent = "med";
            }
            else{
                priorityDiv.classList.add("high-priority");
                priorityDiv.textContent = "high";
            }

            let editDiv = document.createElement("div");
            editDiv.classList.add("edit-task");

            editDiv.addEventListener("click", function(e){
                let editTaskHeader = document.createElement("div");
                editTaskHeader.classList.add("edit-task-form-header");
                editTaskHeader.textContent = "Edit Task";
                taskFormFunction(taskList[i]);
                let form = document.querySelector(".new-task-form");
                form.insertBefore(editTaskHeader, form.firstChild);
                document.querySelector(".new-task-title-input").value = taskList[i].title;
                document.querySelector(".new-task-desc-input").value = taskList[i].desc;
                document.querySelector(".new-task-due-date-input").value = taskList[i].dueDate;
                document.querySelector("#submit-new-task").textContent = "Change";
            });

            let deleteDiv = document.createElement("div");
            deleteDiv.classList.add("delete-task");

            deleteDiv.addEventListener("click", function(e){
                taskList.splice(i, 1);
                displayTasks();
            });

            let beginDiv = document.createElement("div");
            beginDiv.classList.add("begin");
            beginDiv.appendChild(completionCheckDiv);
            beginDiv.appendChild(titleDiv);

            let endDiv = document.createElement("div");
            endDiv.classList.add("end");
            endDiv.appendChild(dateDiv);
            endDiv.appendChild(priorityDiv);
            endDiv.appendChild(editDiv);
            endDiv.appendChild(deleteDiv);

            let mainInfoDiv = document.createElement("div");
            mainInfoDiv.classList.add("task-main-info");
            mainInfoDiv.appendChild(beginDiv);
            mainInfoDiv.appendChild(endDiv);

            let descDiv = document.createElement("div");
            descDiv.classList.add("task-desc");
            descDiv.textContent = taskList[i].desc

            taskDiv.appendChild(mainInfoDiv);
            taskDiv.appendChild(descDiv);

            taskDiv.dataset.id = i;

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
            let newTaskHeader = document.createElement("div");
            newTaskHeader.classList.add("new-task-form-header");
            newTaskHeader.textContent = "New Task";
            taskFormFunction();
            let form = document.querySelector(".new-task-form");
            form.insertBefore(newTaskHeader, form.firstChild);
            
        });
    }


    // Performs the necessary form functionality
    // The task parameter is the task that will be edited and if there is
    // no parameter, then it will create a new task
    function taskFormFunction(task = undefined){
        let disableClicks = document.createElement("div");
        disableClicks.classList.add("disable-other-clicks");
        let newTaskForm = createNewTaskForm();
        disableClicks.appendChild(newTaskForm);
        document.querySelector("body").appendChild(disableClicks);

        document.querySelector(".new-task-form").addEventListener("submit", function(e){
            e.preventDefault();
            let formData = new FormData(this);
            let titleInput = formData.get("task-title");
            let descInput = formData.get("task-desc");
            let priorityInput = formData.get("task-priority");
            let dateInput = new Date(formData.get("task-due-date"));
            if (task === undefined){
                let currentProject = document.querySelector(".selected-project");
                projectList[currentProject.dataset.id].addTask(createTask(titleInput, descInput, dateInput, priorityInput));
            }
            else{
                task.title = titleInput;
                task.desc = descInput;
                task.priority = priorityInput;
                task.dueDate = format(dateInput, 'yyyy-MM-dd');
            }
            removeTaskForm();
            displayTasks();
        });

        document.querySelector("#cancel-new-task").addEventListener("click", function(e){
            removeTaskForm();
        });
    }

    function removeTaskForm(){
        let formAndBackground = document.querySelector(".disable-other-clicks");
        formAndBackground.remove();
    }


    // Creates the form that is used for tasks and returns it so the calling
    // section can do the necessary additions to it
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
        taskTitle.required = true;

        let descLabel = document.createElement("label");
        descLabel.for = "task-desc";
        descLabel.textContent = "Description:";

        let taskDesc = document.createElement("textarea");
        taskDesc.classList.add("new-task-desc-input");
        taskDesc.id = "task-desc";
        taskDesc.name = "task-desc";
        taskDesc.required = true;

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
        taskDueDate.required = true;

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

        return newTaskForm;
    }

    display();
}

export default start;