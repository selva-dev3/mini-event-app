import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import './eventList.css'
import Logout from '../logout/Logout';
import { useLocation, useNavigate } from 'react-router-dom';
import { tokenContext } from '../../contexts/tokenContexts';
import { toast } from 'react-toastify';


function Eventlist() {

  const location = useLocation();
  const [login, setLogin] = useState(false)
  const { token,url } = useContext(tokenContext)

  const [eventList, setEventList] = useState([]);
  const navigate = useNavigate();

  async function fetchData() {
    try {

      const res = await axios.get(
        `${url}/api/event/eventList`,
        {
          headers: {
            token: token
          }
        }
      );

      if (res.data.success) {
        setEventList(res.data.allEvent)
      } else {
        setEventList('')
      }

    } catch (error) {
      console.log(error);
    }
  }

  async function deleteData(id){
    try{
        const res = await axios.delete(`${url}/api/event/delete/${id}`,{
          headers:{
            token:token
          }
        });
        if(res.data.success){
          toast.success(res.data.message,{
            className:'my-toast'
          })
        }
        if(!res.data.success){
          toast.error(res.data.message,{
            className:'my-toast'
          })
        }

    }catch(error){
      console.log(error)
    }
  }



  useEffect(() => {
    setLogin(location.state.login);
    if (!token) return;
    fetchData()

  }, [])
  return (
    <div className='container'>
      <div className='logout'>
        <Logout loginState={login} />
          
        

      </div>
      <div className='event-h1'>
        <h1>All Event List Page</h1>
      </div>
      <div className='table-container'>
        {
          eventList.length > 0 ? (
            <table border={1}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Organizer Name</th>
              <th>Date</th>
              <th>Description</th>
              <th>Location</th>
              <th>Contact Number</th>
              <th>Banner Url</th>
              <th>Action Update</th>
              <th>Action Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              eventList.length > 0 && eventList.map((event, index) => (
                <tr key={event._id}>
                  <td>{event.name}</td>
                  <td>{event.organizationName}</td>
                  <td>{event.date}</td>
                  <td>{event.description}</td>
                  <td>{event.location}</td>
                  <td>{event.contactNumber}</td>
                  <td>{event.bannerUrl}</td>
                  <td><button onClick={()=> navigate('/events',{state: {update: true,eventId:event._id,login:location.state.login,}})} className='update'>update</button></td>
                  <td><button onClick={()=>deleteData(event._id)} className='delete'>delete</button></td>

                </tr>
              ))


            }
          </tbody>
        </table>
        
        
          ):(
            <div>
              <h1 className='loading'>Loading.............</h1>
            </div>
          )
        }
         <button style={!eventList.length > 0 ? {display:'none'}:{display:'block' }} className='add-event' onClick={()=>navigate('/events',{state:{login:location.state.login}})} >Add Event</button  >
        
      </div>
     
    </div>
  )
}

export default Eventlist
