import { format } from 'date-fns'

const taskFactory = (title, desc, dueDate, priority) => {
    let completed = false;

    return{
        title,
        desc,
        dueDate,
        priority,
        completed,
    }
};

function createTask(title, desc, dueDate, priority) {
    const task = taskFactory(title, desc, format(dueDate, 'yyyy-MM-dd'), priority);
    return task;
}

export default createTask;