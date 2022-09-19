import { useEffect, useState } from "react"
import React from 'react'
import { useParams, Link } from "react-router-dom";


import '../css/update.css'

function UpdateData() {
    const para = useParams()
    const [updateUser, setUpdateuser] = useState({})
    function onChnageInpt(e) {
        console.log(e.target)
        setUpdateuser({
            ...updateUser,
            [e.target.name]: e.target.value
        })
    }

    async function dataupdatepure(id) {
        console.log(updateUser)
       // delete updateUser.id
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json"); // while sendng json data in to api
        myHeaders.append("Authorization", "Bearer 23f8bb88f24cc1825695900b4f8bfa127cf20694a150c632ed5d620aa47a4ad8");
        const response = await fetch(`https://gorest.co.in/public/v2/users/${para.id}`, {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify(updateUser), // converting object into jsonstring
        })
        const data = await response.json()
        console.log(data)

    }


    async function Editdata(id) {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer 23f8bb88f24cc1825695900b4f8bfa127cf20694a150c632ed5d620aa47a4ad8");
        const response = await fetch(`https://gorest.co.in/public/v2/users/${id}`, {
            headers: myHeaders
        })


        console.log(response)
        const data = await response.json()
        setUpdateuser({ ...data })
        console.log(data)

    }

    useEffect(() => {

        Editdata(para.id)

    }, [para])


    return (
        <div className='Edit-data'>

            <div className='container'>
                <div className="row">
                    <div className='col-12 parent-all-inputs'>
                        <div className='all-inputs p-3 border border-3 rounded'>
                            <div className='mb-3'>
                                <h3 className='head text-center'>Update User</h3>
                            </div>

                            <div className="mb-3">

                                <input type="text" name="name" className="form-control" value={updateUser.name} onChange={onChnageInpt} placeholder="Enter a Name" />
                            </div>
                            <div className='mb-3'>
                                <input type="email" name="email" className="form-control" value={updateUser.email} onChange={onChnageInpt} placeholder="Enter a email" />
                            </div>
                            <div className='mb-3'>
                                <div className="form-check" >
                                    {updateUser.gender === "male" ? <input className="form-check-input" type="radio" name="gender" checked value={updateUser.gender} /> : <input onChange={onChnageInpt} className="form-check-input" type="radio" name="gender" value="male" />}

                                    <label >Male</label>
                                </div>
                                <div className="form-check">
                                    {updateUser.gender === "female" ? <input className="form-check-input" type="radio" name="gender" checked value={updateUser.gender} /> : <input className="form-check-input" onChange={onChnageInpt} type="radio" name="gender" value="female" />}

                                    <label > Female</label>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <select className="form-select form-select-sm" name="status" onChange={onChnageInpt} value={updateUser.status}   >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-warning" onClick={dataupdatepure}>Update User</button>
                            </div>
                            <Link to="/viewdata">
                                View Data
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UpdateData



