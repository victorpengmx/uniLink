import { useAuthContext } from "./useAuthContext"
import { useForumpostContext } from "./useForumpostContext"

export const useLogout =() => {
    const { dispatch } = useAuthContext()
    const { dispatch: forumpostsDispatch } = useForumpostContext()

    const logout = () => {
        // remove user from local storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        forumpostsDispatch({type: 'SET_FORUMPOSTS', payload: null})
    }

    return {logout}
}