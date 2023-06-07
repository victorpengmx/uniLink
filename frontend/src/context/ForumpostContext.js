import {createContext, useReducer} from 'react'

export const ForumpostContext = createContext()

/**
 * @param state
 * @param action
 * 
 * keeps the local state in sync with the database
 */
export const ForumpostReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FORUMPOSTS':
            return {
                forumposts: action.payload
            }
        case 'CREATE_FORUMPOST':
            return {
                forumposts: [action.payload, ...state.forumposts]
            }
        case 'DELETE_FORUMPOST':
            return {
                forumposts: state.forumposts.filter((post) => post._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const ForumpostContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(ForumpostReducer, {
        forumposts: null
    })

    return (
        <ForumpostContext.Provider value={{...state, dispatch}}>
            {children}
        </ForumpostContext.Provider>
    )
}