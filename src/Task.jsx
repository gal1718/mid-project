const Task = ({task,userTasksMarkCompleted}) => {

    const taskMarkCompleted = (userId,taskId) =>{
        userTasksMarkCompleted(userId,taskId)
    }


    return (
        <div style={{border: "2px solid black", marginBottom: "10px"}} className="Task">
            <strong> Title: </strong> {task.title}<br/> <br/>
            <strong> Completed: </strong> {task.completed?.toString()}<br /><br/>
            {!task.completed && <button onClick={() => taskMarkCompleted(task.userId, task.id)}>Mark Completed</button>}
        </div>

    )
}

export default Task

