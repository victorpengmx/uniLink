import {createContext, useReducer} from 'react'

export const FPCommentContext = createContext()

export const FPCommentReducer = (commentState, action) => {
    switch (action.type) {
        case 'SET_COMMENTS':
            return {
                comments: action.payload
            }
        case 'SET_COMMENT':
            return {
                comment: action.payload
            }
        case 'CREATE_COMMENT':
            return {
                comments: [action.payload, ...commentState.comments]
            }
        case 'DELETE_COMMENT':
            return {
                comments: commentState.comments.filter((comment) => comment._id !== action.payload._id)
            }
        default:
            return commentState
    }
}

export const FPCommentContextProvider = ({children}) => {
    const [commentState, commentDispatch] = useReducer(FPCommentReducer, {
        comments: null
    })

    return (
        <FPCommentContext.Provider value={{...commentState, commentDispatch}}>
            {children}
        </FPCommentContext.Provider>
    )
}