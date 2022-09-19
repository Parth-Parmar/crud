import React, { useState } from 'react'
import '../css/datapost.css'
import { Link } from "react-router-dom"


function Datapost() {


    const [username, setUsername] = useState("")
    const [useremail, setUseremail] = useState("")
    const [status, setStatus] = useState("active");
    const [gender, setGender] = useState("")

    const [serverResponse, setResponse] = useState() //message

    const [dataWait, setDatawait] = useState(false) // waiting for data




    // console.log({username,useremail,status,gender})


    async function sendData() {

        const userData = { name: username, email: useremail, status: status, gender: gender }
        console.log(userData)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer 23f8bb88f24cc1825695900b4f8bfa127cf20694a150c632ed5d620aa47a4ad8");
        myHeaders.append("Content-Type", "application/json");
        try {

            setDatawait(true)

            const response = await fetch("https://gorest.co.in/public/v2/users", {
                method: "post",
                headers: myHeaders,
                body: JSON.stringify(userData)
            })

            console.log(response)
            const data = await response.json()
            setDatawait(false)


            if (response.status === 201) {
                setResponse("status successful")
            } else if (response.status === 422) {
                setResponse("requird filed is empty")
            }

            console.log(data)
        } catch (e) {
            console.log(e)
        }
        setUsername("")
        setUseremail("")
        setStatus("")
        setGender("")




    }


    return (
        <div className='post-data'>

            <div className='container'>
                <div className="row">
                    <div className='col-12 parent-all-inputs'>

                        <div className='all-inputs p-3 border border-3 rounded'>
                            <div className='mb-3'>

                                <h3 className='head text-center'>Add User</h3>
                            </div>

                            <div className="mb-3">
                                <input type="text" name="name" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter a Name" />
                            </div>

                            <div className='mb-3'>
                                <input type="email" name="email" className="form-control" value={useremail} onChange={(e) => setUseremail(e.target.value)} placeholder="Enter a email" />

                            </div>

                            <div className='mb-3'>
                                <div className="form-check">
                                    <input className="form-check-input" onClick={() => setGender('Male')} type="radio" name="gender" value={gender} />
                                    <label >Male</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" onClick={() => setGender('Female')} type="radio" name="gender" value={gender} />
                                    <label > Female</label>
                                </div>
                            </div>

                            <div className='mb-3'>
                                <select className="form-select form-select-sm" value={status} onChange={(e) => setStatus(e.target.value)} >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>

                                </select>
                            </div>

                            <div className='mb-3 text-center'>

                                <button className='btn btn-success' disabled={dataWait} onClick={sendData}>{dataWait === true ? "Loading..." : "Add User"}</button>


                                <Link to="/viewdata">
                                    View Data
                                </Link>

                            </div>
                            <div className='mb-3 text-center'>
                                <h6>{serverResponse}</h6>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Datapost