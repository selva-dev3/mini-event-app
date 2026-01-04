import React, { useEffect,useState } from 'react'
import './logout.css'
import {useNavigate} from 'react-router-dom'
function  Logout ({loginState}) {
    const navigate = useNavigate();
    const [logout,setLogout] = useState(false)

    function logoutPage () {
      try{
        localStorage.removeItem('token');
        navigate('/')
      }catch(error){
        console.log(error)
      }
    }
    useEffect(()=>{
      setLogout(loginState)
    },[loginState])
  return (
    <div className='logout-container'>
        <button  onClick={()=>{logoutPage(),setLogout(false)}}>{logout? 'Logout':'Login'}</button>
    </div>
  )
}

export default Logout
