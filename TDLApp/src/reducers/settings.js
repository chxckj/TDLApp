import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../etc/Utility'

const initState = {
	settings: {}
}

const updateSettings = (state, action) => {
	if (action.settings.lang.constructor.name !== 'String') {
		action.settings.lang = 'en'
	}
	return updateObject(state, {
		settings: action.settings
	})
}

const reducer = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE_SETTINGS:
			return updateSettings(state, action)
		default:
			return state
	}
}

export default reducer
