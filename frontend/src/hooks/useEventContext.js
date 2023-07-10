import { EventContext } from "../context/EventContext";
import { useContext } from "react";

export const useEventContext = () => {
    // returns the value of the event context
    const context = useContext(EventContext)

    if (!context) {
        throw Error('useEventContext must be used inside a EventContextProvider')
    }

    return context
}