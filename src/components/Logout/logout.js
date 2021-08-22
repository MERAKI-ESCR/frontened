import React from 'react'
import {useHistory} from 'react-router-dom'

const Logout =()=>{
    const history = useHistory();
    localStorage.clear()
    history.push('/login')
}

export default Logout;