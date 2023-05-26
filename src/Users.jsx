import axios from "axios"
import { useEffect, useState } from "react"
import User from './User';
import './Users.css';


const Users = () => {

    // const [displayUsers, setDisplayUsers] = useState([]); //display users
    const [users, setUsers] = useState([]);// "DB" users
    const [addNewUser, setAddNewUser] = useState(false);
    //const [newUser, setNewUser] = useState({id: 0, name: "", email: "" });
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [filter, setNewFilter] = useState("")



    const usersUrl = 'https://jsonplaceholder.typicode.com/users'
    const toDosUrl = 'https://jsonplaceholder.typicode.com/todos';
    const postsUrl = 'https://jsonplaceholder.typicode.com/posts';


    useEffect(() => {

        const getData = async () => {
            let { data: users } = await axios.get(usersUrl);
            const { data: allTasks } = await axios.get(toDosUrl);
            const { data: allposts } = await axios.get(postsUrl);
            users = users.map((user) => {

                const userTasks = allTasks.filter((task) => task.userId == user.id);
                const userPosts = allposts.filter((post) => post.userId == user.id);

                user.tasks = userTasks;
                user.posts = userPosts;

                user.tasksCompleted = AllTasksCompleted(userTasks);
                return user;
            })

            // setDisplayUsers(users);
            setUsers(users);
        }

        getData();

    }, [])

    const AllTasksCompleted = (userTasks) => {

        for (let i = 0; i < userTasks.length; i++) {
            if (!userTasks[i].completed) {
                return false;
            }
        }
        return true;
    }





    // const filterUsers = (filter) => {

    //     setNewFilter(event.target.value)
    //     const filteredUsers = users.filter(user => user.name.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1 || user.email.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1);
    //     setDisplayUsers(filteredUsers);
    // };


    const updateUser = (obj) => {

        let usersCopy = users;
        let userIndex = users.findIndex(user => user.id == obj.id)
        usersCopy[userIndex] = obj;
        setUsers(usersCopy);
        // setDisplayUsers(usersCopy)
    }


    const deleteUser = (obj) => {

        let newUsers = users.filter(user => user.id != obj.id);
        setUsers(newUsers);
        //setDisplayUsers(newUsers)

    }

    const markTaskCompleted = (userId, taskId) => {


        let usersCopy = users;
        let userIndex = users.findIndex(user => user.id == userId)
        let taskIndex = usersCopy[userIndex].tasks.findIndex(task => task.id == taskId);
        usersCopy[userIndex].tasks[taskIndex].completed = true;
        
        usersCopy[userIndex].tasksCompleted = AllTasksCompleted(usersCopy[userIndex].tasks)
        setUsers(usersCopy);
        // setDisplayUsers(usersCopy)
        return usersCopy[userIndex].tasksCompleted;

    }


    const AddNewTaskUsers = (userId, task) => {

        let usersCopy = users;
        let userIndex = users.findIndex(user => user.id == userId)
        usersCopy[userIndex].tasks.push(task)
        usersCopy[userIndex].tasksCompleted = false;
        setUsers(usersCopy);
        // setDisplayUsers(usersCopy)

    }


    const AddNewPostUsers = (userId, post) => {

        let usersCopy = users;
        let userIndex = users.findIndex(user => user.id == userId)
        usersCopy[userIndex].posts.push(post)
        setUsers(usersCopy);
        //  setDisplayUsers(usersCopy)

    }

    const handleNewUser = () => {

       
        const biggestId = Math.max(...users.map((user) => user.id), 0);
        const newUser = { id: biggestId + 1 , name, email, address: { street: "", city: "", zipcode: "" }, tasks: [], posts: [], tasksCompleted: false }
        let usersCopy = users;
        usersCopy.push(newUser);

        // setDisplayUsers(usersCopy)
        setUsers(usersCopy);
        setName("");/// need to set it uo to see the new user. or anything else except displayuser or users. why ? 
        setEmail("");
    }



    return (

        <div className="Users">

            <div style={{ display: "flex" }}>
                Search: <input type="text" onChange={(event) => setNewFilter(event.target.value)}></input>
                <button onClick={() => setAddNewUser(true)}>Add</button>
            </div>



            {users.filter((user) => user.name.toLowerCase().indexOf(filter) != -1 || user.email.toLowerCase().indexOf(filter) != -1).map((user) =>


                <User key={user.id} user={user} updateUser={updateUser} deleteUser={deleteUser} markTaskCompleted={markTaskCompleted} AddNewTaskUsers={AddNewTaskUsers} AddNewPostUsers={AddNewPostUsers}></User>)
            }


            {addNewUser &&
                <div>

                    Name: <input value={name} type="text" onChange={(event) => setName(event.target.value)}></input>
                    Email: <input value={email} type="email" onChange={(event) => setEmail(event.target.value)}></input>
                    <button onClick={() => handleNewUser()}>Add</button>
                    <button onClick={() => setAddNewUser(false)}>Cancel</button>
                </div>
            }
        </div>
    )
}

export default Users