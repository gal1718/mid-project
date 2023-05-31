import axios from "axios"
import { useEffect, useState } from "react"
import User from './User';
import './Users.css';
import NewUser from "./NewUser";
//import  {usersUrl,toDosUrl,postsUrl} from './constants'
import * as constants from './constants ';
import { AllTasksCompleted } from './utils'


const Users = () => {

    const [users, setUsers] = useState([]);// "DB" users
    const [addNewUser, setAddNewUser] = useState(false);
    const [filter, setNewFilter] = useState("")


    useEffect(() => {
        const getData = async () => {

            const { data: users } = await axios.get(constants.usersUrl);
            const { data: allTasks } = await axios.get(constants.toDosUrl);
            const { data: allposts } = await axios.get(constants.postsUrl);

            const newusers = users.map((user) => {
                const tasks = allTasks.filter((task) => task.userId == user.id);
                const posts = allposts.filter((post) => post.userId == user.id);
                const tasksCompleted = AllTasksCompleted(tasks);

                return { ...user, tasks, posts, tasksCompleted };
            })

            setUsers(newusers);
        }
        getData();

    }, [])



    const updateUser = (userToUpdate) => {
        const newUsers = users.map((user) => user.id != userToUpdate.id ? user : userToUpdate);
        setUsers(newUsers);
    }


    const deleteUser = (userId) => {
        const newUsers = users.filter(user => user.id != userId);
        setUsers(newUsers);
    }


    const markTaskCompleted = (userId, taskId) => {
        const newUsers = users.map((user) => {
            if (user.id != userId)
                return user;
            else {
                user.tasks.map((task) => {
                    if (task.id != taskId)
                        return task
                    else {
                        task.completed = true;
                        return task;
                    }

                })
                user.tasksCompleted = AllTasksCompleted(user.tasks)
                return user;
            }
        })
        setUsers(newUsers);
    }


    const markUserTasksAllCompleted = (userId) => {
        const newUsers = users.map(user => {
            if (user.id != userId)
                return user
            else {
                user.tasks.map(task => {
                    task.completed = true;
                    return task;
                })
                user.tasksCompleted = true;
                return user
            }
        })
        setUsers(newUsers);
    }


    const AddNewTask = (userId, task) => {
        const newUsers = users.map(user => {
            if (user.id != userId)
                return user
            else {
                return { ...user, tasks: [...user.tasks, task], tasksCompleted: false };
            }
        })
        setUsers(newUsers);
    }


    const AddNewPost = (userId, post) => {
        const newUsers = users.map(user => {
            if (user.id != userId)
                return user
            else {
                return { ...user, posts: [...user.posts, post] };
            }
        })
        setUsers(newUsers);
    }


    const handleNewUser = (email, name) => {
        const biggestId = Math.max(...users.map((user) => user.id), 0);
        const newUser = { id: biggestId + 1, name, email, address: { street: "", city: "", zipcode: "" }, tasks: [], posts: [], tasksCompleted: false }
        setUsers([...users, newUser]);
    }



    return (
        <div className="Users">
            <div style={{ display: "flex" }}>
                Search: <input type="text" onChange={(event) => setNewFilter(event.target.value)}></input>
                <button onClick={() => setAddNewUser(true)}>Add</button>
            </div>

            <div style={{ display: "flex" }}>

                <div>
                    {users.filter((user) => user.name.toLowerCase().indexOf(filter) != -1 || user.email.toLowerCase().indexOf(filter) != -1).map((user) =>
                        <User key={user.id} user={user} updateUser={updateUser} addNewUser={addNewUser} deleteUser={deleteUser} markTaskCompleted={markTaskCompleted} markUserTasksAllCompleted={markUserTasksAllCompleted} AddNewTask={AddNewTask} AddNewPost={AddNewPost}></User>)
                    }
                </div>

                <div>
                    {addNewUser &&
                    <> <strong>ADD New user</strong>
                        <NewUser handleNewUser={handleNewUser} setAddNewUser={setAddNewUser}></NewUser>
                        </>
                    }
                </div>

            </div>

        </div>
    )
}


export default Users