import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function ViewData() {

    const [getData, setData] = useState([])

    const [loding, setLoading] = useState(false)

    async function fetchdata() {
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer 9248f140d299d0e6c562fb43599cd1d7e9ae926fa289f38ee8365a790829fd3f");

        const response = await fetch("https://gorest.co.in/public/v2/users", {
            headers: myHeaders
        })
        console.log(response)
        const data = await response.json()
        setLoading(false)

        console.log(data)
        setData([...data])
    }

    useEffect(function () {
        fetchdata()
    }, [])

    async function Removedata(no) {

        var myHeaders = new Headers()
        myHeaders.append("Authorization", "Bearer 9248f140d299d0e6c562fb43599cd1d7e9ae926fa289f38ee8365a790829fd3f");
        try {
            fetch(`https://gorest.co.in/public/v2/users/${no}`, {
                method: "delete",
                headers: myHeaders
            })
            let userdata = [...getData]
            let index = userdata.findIndex((value) => value.id === no)
            userdata.splice(index, 1)
            setData([...userdata])
        } catch (e) {

        }
    }


    return (
        <div className='show-data'>
            <div className='row'>
                <div className='col-12'>
                    <table className='table text-center'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>email</th>
                                <th>gender</th>
                                <th>status</th>

                            </tr>
                        </thead>
                        <tbody>

                            {
                                loding ? (<tr>
                                    <td colSpan={5}>Loading...</td>
                                </tr>) : (

                                    typeof getData !== "undefined" && Array.isArray(getData) && getData.map(function (value, index) {
                                        return (<tr key={index}>
                                            <td>{value.id}</td>
                                            <td>{value.name}</td>
                                            <td>{value.email}</td>
                                            <td>{value.gender}</td>
                                            <td>{value.status}</td>


                                            <td><Link to={`/singleser/${value.id}`}>View info</Link></td>
                                            <td><button className='btn btn-danger' onClick={() => {
                                                Removedata(value.id)
                                            }}>Delete</button></td>


                                        </tr>)
                                    })
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ViewData