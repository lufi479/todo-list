import createTask from "./taskCreator";

const projectFactory = (name) => {
    const taskList = [];

    const addTask = (task) => {
        taskList.push(task);
    }

    return {
        name,
        taskList,
        addTask
    };
}

function createProject(name) {
    const project = projectFactory(name);
    return project;
}

export default createProject;