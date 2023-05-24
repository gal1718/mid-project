import axios from "axios"
import { useEffect, useState } from "react"
import User from './User';

const Users = () => {

    const usersUrl = 'https://jsonplaceholder.typicode.com/users'
    const toDosUrl = 'https://jsonplaceholder.typicode.com/todos';
    const postsUrl = 'https://jsonplaceholder.typicode.com/posts';


    const [displayUsers, setDisplayUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [displayUser, setDisplayUser] = useState({
        id: 0, name: '', username: '', email: '', address: {
            street: '',
            suite: '',
            city: '',
            zipcode: '',
            geo: {
                lat: '',
                lng: ''
            }
        },
        phone: '',
        website: '',
        company: {
            name: '',
            catchPhrase: '',
            bs: ''
        }, tasks: [], posts: [], tasksCompleted: false
    });
   

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

                user.tasksCompleted = true;
                for (let i = 0; i < userTasks.length; i++) {
                    if (!userTasks[i].completed) {
                        user.tasksCompleted = false;
                        break;
                    }
                }
                return user;
            })

            setDisplayUsers(users); //display users 
            setUsers(users);// "DB" users


        }

        getData();

    }, [])


    const filterUsers = (e) => {

        const filteredUsers = users.filter(user => user.name.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1 || user.email.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1);
        setDisplayUsers(filteredUsers);
    };

    const setUserHnadler = (obj) => {

        //debugger
        let usersCopy = users;
        let userIndex = users.findIndex(user => user.id == obj.id)
        usersCopy[userIndex] = obj;
        setDisplayUsers(usersCopy)
        setDisplayUser(obj);
        console.log(users)

    }

    const updateUser = (obj) => {
       
        let usersCopy = users;
        let userIndex = users.findIndex(user => user.id == obj.id)
        usersCopy[userIndex] = obj;
        setUsers(usersCopy);
    }


    return (
        <div className="Users">
            Search: <input type="text" onChange={filterUsers}></input>
            {displayUsers.map((user, index) => <User key={index} user={user} setUserHnadler={setUserHnadler} updateUser={updateUser}></User>)}
        </div>

    )

}

export default Users