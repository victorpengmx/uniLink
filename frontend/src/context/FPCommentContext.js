import {createContext, useReducer} from 'react'

export const FPCommentContext = createContext()

/**
 * @param state
 * @param action
 * 
 * keeps the local state in sync with the database
 */

export const FPCommentReducer = (state, action) => {
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
                comments: [action.payload, ...state.comments]
            }
        case 'DELETE_COMMENT':
            return {
                comments: state.comments.filter((comment) => comment._id !== action.payload._id)
            }
        default:
            return state
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