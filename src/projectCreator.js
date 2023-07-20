import createTask from "./taskCreator";

const projectFactory = (name) => {
    let id = 0;
    const taskList = [];

    const addTask = (task) => {
        taskList.push(task);
    }

    return {
        name,
        id,
        taskList,
        addTask
    };
}

function createProject(name) {
    const project = projectFactory(name);
    return project;
}

export default createProject;