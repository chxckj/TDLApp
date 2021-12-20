import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../etc/Utility'

const initState = {}

const updateAnalysis = (state, action) =>
	updateObject(state, {
		...action.analysis,
	})

const reducer = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE_ANALYSIS:
			return updateAnalysis(state, action)
		default:
			return state
	}
}

export default reducer
