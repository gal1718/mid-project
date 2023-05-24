
import { useEffect, useState } from "react";


const User = ({ setUserHnadler, user, updateUser }) => {

    const [user, setDisplayUser] = useState({});

    console.log("users rended");

    const [showOtherData, setShowOtherData] = useState(false);
    // const toDosUrl = 'https://jsonplaceholder.typicode.com/todos';

    // useEffect(() => {

    //     const getTasks = async () => {
    //         const { data: userTasks } = await axios.get(`${toDosUrl}/?userId=${user.id}`)
    //         setUserHnadle({ ...user, tasks: data })
    //         console.log(data);
    //     }
    //     getTasks();
    // }, [])
    //console.log(userFromparent.id)

    const handleSubmit = (event) => {
        event.preventDefault();
        updateUser(user);
        //updatePerson(personFromParent);
        //console.log(person);
    }



    return (
        <div className="User" style={{ textAlign: 'center' }}>
            <form style={{ border: user.tasksCompleted ? '2px solid green' : '2px solid red', width: "fit-content" }} onSubmit={handleSubmit}>

                ID: {user.id}<br></br>
                Name: <input type="text" value={user.name} onChange={(event) => setUserHnadler({ ...user, name: event.target.value })}></input><br></br>
                Email: <input type="email" value={user.email} onChange={(event) => setUserHnadler({ ...user, email: event.target.value })}></input> <br></br>

                <section onMouseOver={() => setShowOtherData(true)} onClick={() => setShowOtherData(false)} style={{ backgroundColor: "grey" }}>Other Data</section>

                <button type="submit">Update</button>

                {showOtherData &&

                    <div>
                        Street: <input type="text" value={user.address.street} onChange={(event) => setDisplayUser({ ...user, address: { ...user.address, street: event.target.value } })}></input><br></br>
                        City: <input type="text" value={user.address.city} onChange={(event) => setDisplayUser({ ...user, address: { ...user.address, city: event.target.value } })}></input><br></br>
                        Zip Code: <input type="text" value={user.address.zipcode} onChange={(event) => setDisplayUser({ ...user, address: { ...user.address, zipcode: event.target.value } })}></input><br></br>
                    </div>
                }

            </form>


        </div>

    )



}

export default User