export const SET_GIGS = 'SET_GIGS'
export const REMOVE_GIG = 'REMOVE_GIG'
export const ADD_GIG = 'ADD_GIG'
export const UPDATE_GIG = 'UPDATE_GIG'
export const ADD_TO_GIGT = 'ADD_TO_GIGT'
export const CLEAR_GIGT = 'CLEAR_GIGT'
export const UNDO_REMOVE_GIG = 'UNDO_REMOVE_GIG'
export const REMOVE_FROM_GIGT = 'REMOVE_FROM_GIGT'

const initialState = {
    gigs: [],
    gigt: [],
    lastRemovedGig: null
}

export function gigReducer(state = initialState, action) {
    var newState = state
    var gigs
    var gigt
    switch (action.type) {
        case SET_GIGS:
            newState = { ...state, gigs: action.gigs }
            break
        case REMOVE_GIG:
            const lastRemovedGig = state.gigs.find(gig => gig._id === action.gigId)
            gigs = state.gigs.filter(gig => gig._id !== action.gigId)
            newState = { ...state, gigs, lastRemovedGig }
            break
        case ADD_GIG:
            newState = { ...state, gigs: [...state.gigs, action.gig] }
            break
        case UPDATE_GIG:
            gigs = state.gigs.map(gig => (gig._id === action.gig._id) ? action.gig : gig)
            newState = { ...state, gigs }
            break
        case ADD_TO_GIGT:
            newState = { ...state, gigt: [...state.gigt, action.gig] }
            break
        case REMOVE_FROM_GIGT:
            gigt = state.gigt.filter(gig => gig._id !== action.gigId)
            newState = { ...state, gigt }
            break
        case CLEAR_GIGT:
            newState = { ...state, gigt: [] }
            break
        case UNDO_REMOVE_GIG:
            if (state.lastRemovedGig) {
                newState = { ...state, gigs: [...state.gigs, state.lastRemovedGig], lastRemovedGig: null }
            }
            break
        default:
    }
    return newState
}
