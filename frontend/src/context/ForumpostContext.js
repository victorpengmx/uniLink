import {createContext, useReducer} from 'react'

export const ForumpostContext = createContext()

// Global variable for orginal state (not current state)

let a;

export const ForumpostReducer = (state, action) => {
    switch (action.type) {
        case "SET_FORUMPOSTS":
            a = action.payload
            return {
                forumposts: action.payload,
            };
        case "CREATE_FORUMPOST":
            return {
                forumposts: [action.payload, ...state.forumposts],
            };
        case "DELETE_FORUMPOST":
            return {
                forumposts: state.forumposts.filter((post) => post._id !== action.payload._id),
            };
        case "SEARCH_FORUMPOSTS":
            return {
                forumposts: state.forumposts.filter((post) =>
                    post.title.toLowerCase().includes(action.payload.toLowerCase())
                ),
            };
        default:
            return state;
    }
};

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
