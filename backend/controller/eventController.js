import Event from "../models/eventModel.js";


// CREATE NEW EVENT

export const createEvent = async (req, res) => {
    const { name, date, location, bannerUrl, description, contactNumber, organizationName, userId } = req.body;

    try {
        if (!name || !date || !location || !bannerUrl || !description || !contactNumber || !organizationName) {
            return res.json({ success: false, message: "Please fill all the fields" })

        }

        const event = await Event.create({
            name: name,
            date: date,
            location: location,
            bannerUrl: bannerUrl,
            description: description,
            contactNumber: contactNumber,
            organizationName: organizationName,
            createtdBy: userId
        })

        if (!event) {
            return res.json({ success: false, message: "Event Not Created" })
        }
        res.json({ success: true, event, message: 'Event Created Successfully' })
    } catch (error) {
        res.json({ success: false, message: error })

    }

}

// GET ALL EVENTS
export const getEvents = async (req, res) => {
    const { userId } = req.body;

    try {
        if (!userId) {
            return res.json({ success: false, message: 'User id is Missing' });
        }
        const allEvent = await Event.find(({ createtdBy: userId }));
        if (!allEvent) {
            return res.json({ success: false, message: 'Event is Not Available' });
        }
        res.json({ success: true, allEvent })
    } catch (error) {
        res.json({ success: false, message: 'Event is retrieving failed' })
    }
}

// DELETE EVENT

export const deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.json({ success: false, message: 'Event id is Missing' })
        }
        const event = await Event.findByIdAndDelete(id, { isDeleted: true })
        if (!event) {
            return res.json({ success: false, message: 'Event Not Found' })
        }
        res.json({ success: true, message: 'Event Deleted Successfully' });
    } catch (error) {
        res.json({ success: false, message: error })

    }
}

// GET EVENT

export const getEvent = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.json({ success: false, message: 'Event can not be found' })
        }
        const event = await Event.findById(id);
        if (!event) {
            return res.json({ success: false, message: 'Event Not Found' })
        }
        res.json({ success: true, event })
    } catch (error) {
        res.json({ success: false, message: error })
    }
}

// UPDATE EVENT

export const updateEvent = async (req,res) => {
    const {id} = req.params;
    try{
        if(!id){
            return res.json({success: false, message: 'Event can not be found'})
        }
        const event = await Event.findByIdAndUpdate(id,req.body,{new: true})
        if(!event){
            return res.json({success: false, message: 'Event Not updated'})
        }
        res.json({success: true, message: 'Event Updated Successfully'})
    }catch(error){
        res.json({success: false, message: error})
    }
}



export default { createEvent, getEvents, deleteEvent,getEvent,updateEvent };