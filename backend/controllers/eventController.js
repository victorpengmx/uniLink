const Event = require('../models/eventModel')
const mongoose = require('mongoose')

// Get all events
const getAllEvents = async(req, res) => {
    // const user_id = req.user._id

    const events = await Event.find({ /*user_id*/ }).sort({createdAt: -1})

    res.status(200).json(events)
}

// Get user events
const getUserEvents = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userEvents = await Event.find({ user_id: userId });

        res.json(userEvents);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user events' });
    }
};

// Get a single event
const getSingleEvent = async(req, res) => {

    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such event'})
    }

    const event = await Event.findById(id)

    if (!event) {
        return res.status(404).json({error: 'No such event'})
    }

    res.status(200).json(event)
}

// Create a new event
const createEvent = async(req, res) => {
    const {title, time, description, user_id} = req.body

    //add new event to database
    try {
        // const user_id = req.user._id

        const event = await Event.create({title, description, time, user_id})
        res.status(200).json(event)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Delete a event
const deleteEvent = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such event'})
    }

    const event = await Event.findOneAndDelete({_id: id})

    if (!event) {
        return res.status(404).json({error: 'No such event'})
    }

    res.status(200).json(event)
}

// Update a event
const updateEvent = async(req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such event'})
    }

    const event = await Event.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!event) {
        return res.status(404).json({error: 'No such event'})
    }

    res.status(200).json(event)
}

module.exports = {
    getAllEvents,
    getUserEvents,
    getSingleEvent,
    createEvent,
    deleteEvent,
    updateEvent
}