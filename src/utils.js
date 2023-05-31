export const AllTasksCompleted = (userTasks) => {


    // return userTasks.some((task) => task.completed === false)
    for (let i = 0; i < userTasks.length; i++) {
        if (!userTasks[i].completed) {
            return false;
        }
    }
    return true;
}


