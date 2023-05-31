
import { useState } from 'react'
import Task from './Task'

const UserTasks = ({ user, markCompleted, markAllCompleted, AddNewTask }) => {

    const [addTask, setAddTask] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");


    const userTasksMarkCompleted = (userId, taskId) => {
        markCompleted(userId, taskId)//mark in parent -user
    }


    const handleNewTaskTitle = () => {
        const biggestId = Math.max(...user.tasks.map((task) => task.id), 0);
        const newTask = { userId: user.id, id: biggestId + 1, title: newTaskTitle, completed: false }
        setAddTask(false)
        AddNewTask(user.id, newTask);
        setNewTaskTitle("");
    }



    return (
        <div className="UserTasks">
            <strong>Todos - User {user.id}</strong> <button onClick={() => setAddTask(true)}>Add</button> <br /> <br /> <br />
            {!user.tasksCompleted && <button onClick={() => markAllCompleted()}>Mark All Completed</button>}


            {!addTask && user.tasks.map((task) => {
                return <Task userTasksMarkCompleted={userTasksMarkCompleted} markAllCompleted={markAllCompleted} key={task.id} task={task}></Task>
            })
            }

            {addTask &&
                <div>
                    <strong>Title: <input value={newTaskTitle} onChange={(event) => setNewTaskTitle(event.target.value)} type="text"></input></strong>
                    <button onClick={() => setAddTask(false)}>Cancel</button>
                    <button onClick={() => handleNewTaskTitle()}>Add</button>

                </div>
            }
        </div>

    )
}

export default UserTasks

