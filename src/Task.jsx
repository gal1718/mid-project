

import { useState } from 'react'

const Task = ({task,userTasksMarkCompleted}) => {

    const [taskCompleted, setTaskCompleted] = useState(task.completed); 


    const taskMarkCompleted = (userId,taskId) =>{
        setTaskCompleted(true);
        userTasksMarkCompleted(userId,taskId)

    }


    return (
        <div style={{border: "2px solid black", marginBottom: "10px"}} className="Task">


            <strong> Title: </strong> {task.title}<br/> <br/>
            <strong> Completed: </strong> {taskCompleted?.toString()}<br /><br/>
            {!taskCompleted && <button onClick={() => taskMarkCompleted(task.userId, task.id)}>Mark Completed</button>}

        </div>

    )

}

export default Task

