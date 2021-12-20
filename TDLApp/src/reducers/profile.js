import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../etc/Utility'

const initState = {}

const updateProfile = (state, action) =>
	updateObject(state, {
		...action.profile,
	})

const reducer = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE_PROFILE:
			return updateProfile(state, action)
		default:
			return state
	}
}

export default reducer
