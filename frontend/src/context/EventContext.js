import {createContext, useReducer} from 'react'

export const EventContext = createContext()

export const EventReducer = (eventState, action) => {
    switch (action.type) {
        case "SET_EVENTS":
            return {
                events: action.payload,
            };
        case "CREATE_EVENT":
            return {
                events: [action.payload, ...eventState.events],
            };
        case "DELETE_EVENT":
            return {
                events: eventState.events.filter((event) => event._id !== action.payload._id),
            };
        case "SEARCH_EVENTS":
            return {
                events: eventState.events.filter((event) =>
                event.title.toLowerCase().includes(action.payload.toLowerCase())
                ),
            };
        default:
            return eventState;
    }
};

export const EventContextProvider = ({children}) => {
    const [eventState, eventDispatch] = useReducer(EventReducer, {
        events: null
    })

    return (
        <EventContext.Provider value={{...eventState, eventDispatch}}>
            {children}
        </EventContext.Provider>
    )
}
