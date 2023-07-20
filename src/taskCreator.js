const taskFactory = (title, desc, dueDate, priority) => {
    let completed = false;

    const changeCompletedStatus = () => {
        completed = completed ? false : true;
        return completed;
    }

    return{
        title,
        desc,
        dueDate,
        priority,
        completed,
        changeCompletedStatus
    }
};

function createTask(title, desc, dueDate, priority) {
    const task = taskFactory(title, desc, dueDate, priority);
    return task;
}

export default createTask;