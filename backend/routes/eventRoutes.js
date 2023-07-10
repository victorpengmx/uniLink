const express = require('express')
const {
    getAllEvents,
    getUserEvents,
    getSingleEvent,
    createEvent,
    deleteEvent,
    updateEvent
} = require('../controllers/eventController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require authentication for all event routes
router.use(requireAuth)

// GET all events
router.get('/', getAllEvents)

// GET user event
router.get('/user/:userId', getUserEvents);

// GET single event
router.get('/:id', getSingleEvent)

// POST new event
router.post('/', createEvent)

// DELETE event
router.delete('/:id', deleteEvent)

// UPDATE event
router.patch('/:id', updateEvent)

module.exports = router
