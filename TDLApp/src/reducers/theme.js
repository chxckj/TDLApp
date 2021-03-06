import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../etc/Utility'

const initState = {}

const initTheme = (state, action) =>
	updateObject(state, {
		theme: action.theme,
	})

const initThemes = (state, action) =>
	updateObject(state, {
		themes: action.themes,
	})

const reducer = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.INIT_THEME:
			return initTheme(state, action)
		case actionTypes.INIT_THEMES:
			return initThemes(state, action)
		default:
			return state
	}
}

export default reducer
