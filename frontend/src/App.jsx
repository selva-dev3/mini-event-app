
import Login from './components/authPage/Login'

import { Routes, Route } from "react-router-dom"
import Event from './components/eventPage/Event'
import Eventlist from './components/eventlistPage/Eventlist'
import Logout from './components/logout/Logout'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';



function App() {

  return (

    <>
      <ToastContainer />
      {/* <Logout/> */}
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/events' element={<Event />} />
          <Route path='/eventsList' element={<Eventlist />} />
        </Routes>
    </>
  )
}

export default App
