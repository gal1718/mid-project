const NewUser = ({ handleNewUser, setName, setEmail, setAddNewUser, email, name }) => {




    return (
        <div style={{ border: "2px solid black", width: "340px", padding: "15px", textAlign: "left", display: "flex", flexDirection: "column", alignSelf: "end" }} className="NewUser">


            <strong>Name: <input value={name} type="text" onChange={(event) => setName(event.target.value)}></input></strong><br></br>
            <strong>Email: <input value={email} type="email" onChange={(event) => setEmail(event.target.value)}></input></strong>

            <div style={{ display: "flex" }}>
                <button onClick={() => setAddNewUser(false)}>Cancel</button>
                <button style={{marginLeft: "8px"}} onClick={() => handleNewUser()}>Add</button>

            </div>


        </div>
    )
}


export default NewUser