import { ForumpostContext } from "../context/ForumpostContext";
import { useContext } from "react";

export const useForumpostContext = () => {
    // returns the value of the forumpost context
    const context = useContext(ForumpostContext)

    if (!context) {
        throw Error('useForumpostContext must be used inside a ForumpostContextProvider')
    }

    return context
}