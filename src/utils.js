export const AllTasksCompleted = (userTasks) => {
 
    if (userTasks.some((task) => task.completed === false))
        return false;
    return true


}




