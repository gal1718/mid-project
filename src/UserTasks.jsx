
import * as React from 'react'
import { useState } from 'react'
import Task from './Task'

const UserTasks = ({ user, markCompleted, AddNewTaskUser }) => {

    const [userTasks, setUserTasks] = useState(user.tasks)
    const [addTask, setAddTask] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");



    const userTasksMarkCompleted = (userId, taskId) => {
        
        let userTasksCopy = userTasks;
        let taskIndex = userTasks.findIndex(task => task.id == taskId)
        userTasksCopy[taskIndex].completed = false;
        setUserTasks([...userTasksCopy]);
        
        markCompleted(userId, taskId)//mark in parent -user

    }

    const handleNewTaskTitle = () => {

        const biggestId = Math.max(...userTasks.map((task) => task.id), 0);
       
        const newTask = { userId: user.id, id: biggestId + 1 , title: newTaskTitle, completed: false}
        setUserTasks([...userTasks,newTask]);
        setAddTask(false)
        AddNewTaskUser(user.id,newTask);
    }




    return (
        <div className="UserTasks">
            <strong>Todos - User {user.id}</strong> <button onClick={() => setAddTask(true)}>Add</button> <br/> <br/> <br/>

            {!addTask && userTasks.map((task) => {

                return <Task userTasksMarkCompleted={userTasksMarkCompleted} key={task.id} task={task}></Task>

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

