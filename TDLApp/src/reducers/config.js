import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../etc/Utility'

const initState = {
	showSnackbar: false,
	snackbarText: '',
}

const updateSnackbar = (state, action) =>
	updateObject(state, {
		showSnackbar: action.showSnackbar,
		snackbarText: action.snackbarText ? action.snackbarText : state.snackbarText,
	})

const reducer = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE_SNACKBAR:
			return updateSnackbar(state, action)
		default:
			return state
	}
}

export default reducer
