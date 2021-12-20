import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../etc/Utility'

const initState = {
	categories: false,
}

const initCategories = (state, action) =>
	updateObject(state, {
		categories: action.categories,
	})

const reducer = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.INIT_CATEGORIES:
			return initCategories(state, action)
		default:
			return state
	}
}

export default reducer
