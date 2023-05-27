
import { useState } from "react";
import UserTasks from "./UserTasks";
import UserPosts from "./UserPosts";


const User = ({ user, updateUser, deleteUser, markTaskCompleted, AddNewTaskUsers, AddNewPostUsers }) => {

    const [displayUser, setDisplayUser] = useState(user);
    const [selected, setSelected] = useState(false);
    const [showOtherData, setShowOtherData] = useState(false);
    const [tasksCompleted, setTaskCompleted] = useState(displayUser.tasksCompleted)


    const handleSubmit = (event) => {
        event.preventDefault();
        updateUser({...displayUser});

    }

    const markCompleted = (userId, taskId) => {

        setTaskCompleted(markTaskCompleted(userId, taskId))//mark completed in parent - users

        let displayUserCopy = displayUser;
        let taskIndex = displayUserCopy.tasks.findIndex(task => task.id == taskId)
        displayUserCopy.tasks[taskIndex].completed = true

        setDisplayUser({...displayUserCopy})

    }

    const AddNewTaskUser = (userId, task) => {

        setTaskCompleted(false);
        AddNewTaskUsers(userId, task)

        //add task to dispayuser state
        let displayUserCopy = displayUser;
        displayUserCopy.tasks.push(task);
        setDisplayUser({...displayUserCopy})
    }


    const AddNewPostUser = (userId, post) => {

        AddNewPostUsers(userId, post)

    }




    return (
        <div className="User" style={{ textAlign: 'left', margin: "10px", position: "relative" }}>



            <form style={{ backgroundColor: selected ? 'orange' : '', border: tasksCompleted ? '2px solid green' : '2px solid red', width: "340px", padding: "15px" }} onSubmit={handleSubmit}>

                <strong onClick={() => setSelected(!selected)}>ID: {displayUser.id}</strong><br></br>
                <strong>Name: <input type="text" value={displayUser.name} onChange={(event) => setDisplayUser({ ...displayUser, name: event.target.value })}></input></strong><br></br><br />
                <strong>Email: <input type="email" value={displayUser.email} onChange={(event) => setDisplayUser({ ...displayUser, email: event.target.value })}></input></strong> <br></br><br></br>


                <span onMouseOver={() => setShowOtherData(true)} onClick={() => setShowOtherData(false)} style={{ backgroundColor: "grey" }}>Other Data</span><br /><br />

                {showOtherData &&

                    <div style={{ border: "2px solid black", borderRadius: "5px", padding: "10px" }}>
                        <strong>Street: <input type="text" value={displayUser.address?.street} onChange={(event) => setDisplayUser({ ...displayUser, address: { ...displayUser.address, street: event.target.value } })}></input></strong><br></br><br />
                        <strong>City: <input type="text" value={displayUser.address?.city} onChange={(event) => setDisplayUser({ ...displayUser, address: { ...displayUser.address, city: event.target.value } })}></input></strong><br></br><br />
                        <strong>Zip Code: <input type="text" value={displayUser.address?.zipcode} onChange={(event) => setDisplayUser({ ...displayUser, address: { ...displayUser.address, zipcode: event.target.value } })}></input></strong><br></br>
                    </div>

                }


                <button style={{ marginRight: "6px" }} type="submit">Update</button>
                <button onClick={() => deleteUser(displayUser)}>Delete</button>



            </form>

            <div style={{ width: "350px", position: "absolute", top: "0", "right": "50%", overflowY: "auto", height: "340px" }}>

                {selected &&

                    <div>
                        <UserTasks markCompleted={markCompleted} user={displayUser} AddNewTaskUser={AddNewTaskUser}></UserTasks><br /> <br />
                        <UserPosts user={displayUser} AddNewPostUser={AddNewPostUser}></UserPosts>
                    </div>

                }
            </div>


        </div>

    )
}

export default User