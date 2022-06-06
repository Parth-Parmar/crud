import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Singel() {

    const para = useParams()
    let [userData, setUserData] = useState({})

    const [datanot, setdatanot] = useState("")



    async function SingleuserData(no) {
        var header = new Headers()
        header.append("Authorization", "Bearer 9248f140d299d0e6c562fb43599cd1d7e9ae926fa289f38ee8365a790829fd3f");
        const response = await fetch(`https://gorest.co.in/public/v2/users/${no}`, {
            headers: header
        })
        const data = await response.json()
        if (response.status === 404) {

            setdatanot("data not found")

        } else {
            setUserData({ ...data })
        }
    }



    useEffect(() => {

        SingleuserData(para.id)

    }, [para])


    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <div className='single-user'>
                        {datanot !== "" ? <h1 className='text-center'>{datanot}</h1> : (<>
                            <h6 className='heding'>{userData.id}</h6>
                            <h4 className='text'>{userData.name }</h4>
                            <h6 className="email">{userData.email}</h6>
                            <h6 className='gender'>{userData.gender }</h6>
                            <h6 className='status'>{userData.status }</h6></>)}




                    </div>
                </div>
            </div>
        </div>

    )
}

export default Singel