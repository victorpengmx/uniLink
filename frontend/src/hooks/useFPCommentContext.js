import { FPCommentContext } from "../context/FPCommentContext";
import { useContext } from "react";

export const useFPCommentContext = () => {
    // returns the value of the comment context
    const context = useContext(FPCommentContext)

    if (!context) {
        throw Error('useFPCommentContext must be used inside a FPCommentContextProvider')
    }

    return context
}