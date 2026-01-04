import React, { useContext, useEffect, useState } from 'react'
import './event.css'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Logout from '../logout/Logout'
import { tokenContext } from '../../contexts/tokenContexts';


function Event() {

    const [login, setLogin] = useState(false);
    const [event, setEvent] = useState({
        name: '',
        organizationName: '',
        date: '',
        description: '',
        location: '',
        contactNumber: '',
        bannerUrl: ''
    });

    function handleChange(e) {
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        })
    }
    const navigate = useNavigate();
    const locationState = useLocation();
    const { token, url } = useContext(tokenContext)
    const [updateEvent, setUpdateEvent] = useState(false)
    const [eventId, setEventId] = useState('');
    async function submit(e) {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/api/event/new/event`, event, { headers: { token } })
            const data = res.data;
            if (!data.success) {
                toast.error(data.message, {
                    className: "my-toast"
                })
            }
            if (data.success) {
                toast.success(data.message, {
                    className: "my-toast"
                })
            }
            setEvent({
                name: '',
                organizationName: '',
                date: '',
                description: '',
                location: '',
                contactNumber: '',
                bannerUrl: ''
            })


        } catch (error) {
            console.log(error)

        }


    }



    async function updateCurrentData(e) {
        e.preventDefault();
        try {
            const res = await axios.put(`${url}/api/event/update/${eventId}`, event, {
                headers: {
                    token: token
                }
            })
            if (res.data.success) {
                toast.success(res.data.message, {
                    className: 'my-toast'
                })
                navigate('/eventsList', { state: { login: locationState.state.login } })
            }
            if (!res.data.success) {
                toast.error(res.data.message, {
                    className: 'my-toast'
                })
            }

        } catch (error) {
            console.log(error)

        }
    }

    async function fetchData(e) {
        try {
            if (eventId) {
                const fetchData = await axios.get(`${url}/api/event/${eventId}`, {
                    headers: {
                        token: token
                    }
                })

                if (fetchData.data.success) {
                    setEvent(fetchData.data.event)
                }
                if (!fetchData.data.success) {
                    toast.error(fetchData.data.message, {
                        className: 'my-toast'
                    })
                }

            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect((e) => {
        setLogin(locationState.state.login);
        setUpdateEvent(locationState.state.update)

        setEventId(locationState.state.eventId)
        fetchData(e)
        if (!updateEvent) return;
    }, [eventId])
    return (


        <div className='container'>
            <div className='logout'>
                <Logout loginState={login} />
            </div>

            {
                !updateEvent ? (
                    <div className='inner-container'>
                        <h1>Add Event Page </h1>
                        <div className='form-container'>
                            <div className='inner-form-container'>
                                <div><label htmlFor="name">Name : </label>
                                    <input onChange={handleChange} id='name' name='name' className='input1' value={event.name} type="text" placeholder='Enter the name' /></div>
                                <div> <label htmlFor="organizationName">Organizer Name : </label>
                                    <input onChange={handleChange} id='organizationName' name='organizationName' value={event.organizationName} className='input2' type="text" placeholder='Enter the organization name' /></div>
                                <div> <label htmlFor="date">Date : </label>
                                    <input onChange={handleChange} className='input3' type="date" name='date' id='date' value={event.date} /></div>
                                <div> <label htmlFor="description">Description : </label>
                                    <input onChange={handleChange} id='organizationName' name='description' placeholder='Enter the description' value={event.description} className='input4' type="text" /></div>
                                <div><label htmlFor="location">Location : </label>
                                    <input onChange={handleChange} id='location' name='location' placeholder='Enter the location' value={event.location} className='input5' type="text" /></div>
                                <div> <label htmlFor="phoneNo">Contact Number : </label>
                                    <input onChange={handleChange} name='contactNumber' id='phoneNo' value={event.contactNumber} placeholder='Enter the contact number' className='input6' type="tel" pattern='[0-9]{10}' /></div>

                                <div> <label htmlFor="bannerUrl">BannerUrl : </label>
                                    <input onChange={handleChange} name='bannerUrl' id='bannerUrl' value={event.bannerUrl} placeholder='Enter the banner url' className='input7' type="text" /></div>

                            </div>
                            <div className='submit-button'>
                                <button onClick={(e) => submit(e)}>Submit</button>
                            </div>
                            <p className='goto' onClick={() => navigate('/eventsList', { state: { login: locationState.state.login } })}>Go to Event List Page</p>
                        </div>
                    </div >
                ) : (
                    <div className='inner-container'>
                        <h1>update Event Page </h1>
                        <div className='form-container'>
                            <div className='inner-form-container'>
                                <div><label htmlFor="name">Name : </label>
                                    <input onChange={handleChange} id='name' name='name' className='input1' value={event.name} type="text" placeholder='Enter the name' /></div>
                                <div> <label htmlFor="organizationName">Organizer Name : </label>
                                    <input onChange={handleChange} id='organizationName' name='organizationName' value={event.organizationName} className='input2' type="text" placeholder='Enter the organization name' /></div>
                                <div> <label htmlFor="date">Date : </label>
                                    <input onChange={handleChange} className='input3' type="date" name='date' id='date' value={event.date.slice(0, 10)} /></div>
                                <div> <label htmlFor="description">Description : </label>
                                    <input onChange={handleChange} id='organizationName' name='description' placeholder='Enter the description' value={event.description} className='input4' type="text" /></div>
                                <div><label htmlFor="location">Location : </label>
                                    <input onChange={handleChange} id='location' name='location' placeholder='Enter the location' value={event.location} className='input5' type="text" /></div>
                                <div> <label htmlFor="phoneNo">Contact Number : </label>
                                    <input onChange={handleChange} name='contactNumber' id='phoneNo' value={event.contactNumber} placeholder='Enter the contact number' className='input6' type="tel" pattern='[0-9]{10}' /></div>

                                <div> <label htmlFor="bannerUrl">BannerUrl : </label>
                                    <input onChange={handleChange} name='bannerUrl' id='bannerUrl' value={event.bannerUrl} placeholder='Enter the banner url' className='input7' type="text" /></div>

                            </div>
                            <div className='submit-button'>
                                <button onClick={(e) => updateCurrentData(e)}>update</button>
                            </div>
                        </div>
                    </div >
                )
            }

        </div >

    )
}


export default Event
