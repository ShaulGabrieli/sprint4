import { gigService} from "../services/gig.service.local"
// import { gigService} from "../services/gig.service"

export const SET_FILTER = 'SET_FILTER'



const initialState = {
    filterBy: gigService.getDefaultFilter(),
}


export function filterReducer(state = initialState, action) {
    switch (action.type) {
        case SET_FILTER:
    return { ...state, filterBy: action.filterBy }

        default:
            return state
    }
}


