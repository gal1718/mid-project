
import { useState } from "react";
import UserTasks from "./UserTasks";
import UserPosts from "./UserPosts";


const User = ({ user, updateUser, deleteUser, markTaskCompleted, AddNewTaskUsers, AddNewPostUsers, markUserTasksAllCompleted }) => {

    const [displayUser, setDisplayUser] = useState(user);
    const [selected, setSelected] = useState(false);
    const [showOtherData, setShowOtherData] = useState(false);


    const handleSubmit = (event) => {
        debugger
        event.preventDefault();
        //console.log(`displayUser: ${JSON.stringify(displayUser)} user: ${JSON.stringify(user)}`)
        updateUser({ ...user, name: displayUser.name, email: displayUser.email, address: displayUser.address});

    }

    const markCompleted = (userId, taskId) => {

        const tasks = displayUser.tasks.map(task => task.id === taskId ? { ...task, completed: true } : task);
        setDisplayUser({ ...displayUser, tasks });
        markTaskCompleted(userId, taskId)


    }

    const markAllCompleted = () => {

        const tasks = displayUser.tasks.map(task =>   {return {...task, completed: true}});
        setDisplayUser({ ...displayUser, tasks });
        markUserTasksAllCompleted(user.id)


    }

    const AddNewTaskUser = (userId, task) => {

        AddNewTaskUsers(userId, task)

    }





    return (
        <div className="User" style={{ textAlign: 'left', margin: "10px", position: "relative" }}>



            <form style={{ backgroundColor: selected ? 'orange' : '', border: user.tasksCompleted ? '2px solid green' : '2px solid red', width: "340px", padding: "15px" }} onSubmit={handleSubmit}>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                        <strong onClick={() => setSelected(!selected)}>ID: {displayUser.id}</strong><br></br><br></br>
                        <strong>Name: <input type="text" value={displayUser.name} onChange={(event) => setDisplayUser({ ...displayUser, name: event.target.value })}></input></strong><br></br><br />
                        <strong>Email: <input type="email" value={displayUser.email} onChange={(event) => setDisplayUser({ ...displayUser, email: event.target.value })}></input></strong> <br></br><br></br>


                        <span onMouseOver={() => setShowOtherData(true)} onClick={() => setShowOtherData(false)} style={{ backgroundColor: "grey" }}>Other Data</span><br /><br />

                        {showOtherData &&

                            <div style={{ border: "2px solid black", borderRadius: "20px", padding: "10px", marginBottom: "8px" }}>
                                <strong>Street: <input type="text" value={displayUser.address?.street} onChange={(event) => setDisplayUser({ ...displayUser, address: { ...displayUser.address, street: event.target.value } })}></input></strong><br></br><br />
                                <strong>City: <input type="text" value={displayUser.address?.city} onChange={(event) => setDisplayUser({ ...displayUser, address: { ...displayUser.address, city: event.target.value } })}></input></strong><br></br><br />
                                <strong>Zip Code: <input type="text" value={displayUser.address?.zipcode} onChange={(event) => setDisplayUser({ ...displayUser, address: { ...displayUser.address, zipcode: event.target.value } })}></input></strong><br></br>
                            </div>

                        }


                    </div>
                    <div style={{ alignSelf: "end" }}>
                        <button style={{ marginRight: "6px" }} type="submit">Update</button>
                        <button onClick={() => deleteUser(displayUser)}>Delete</button>
                    </div>

                </div>

            </form>

            <div style={{ width: "350px", position: "absolute", top: "0", "right": "50%", overflowY: "auto", height: "340px" }}>

                {selected &&

                    <div>
                        <UserTasks markCompleted={markCompleted} markAllCompleted={markAllCompleted} user={user} AddNewTaskUser={AddNewTaskUser}></UserTasks><br /> <br />
                        <UserPosts user={user} AddNewPostUsers={AddNewPostUsers}></UserPosts>
                    </div>

                }
            </div>


        </div>

    )
}

export default User