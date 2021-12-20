import { openDatabase } from 'expo-sqlite'
import * as actionTypes from './actionTypes'

const db = openDatabase('maker.db')

export const onUpdateAnalysis = (analysis) => ({
	type: actionTypes.UPDATE_ANALYSIS,
	analysis,
})

export const initAnalysis = (callback = () => null) => (dispatch) => {
	db.transaction(
		(tx) => {
			tx.executeSql('select * from analysis;', [], (_, { rows }) => {
				dispatch(onUpdateAnalysis(rows._array[0]), callback())
			})
		},
		// eslint-disable-next-line no-console
		(err) => console.log(err),
	)
}

export const addEndedTask = () => (dispatch, getState) => {
	const value = getState().analysis.endedTask + 1
	db.transaction(
		(tx) => {
			tx.executeSql('update analysis set endedTask = ? where id = 0;', [value], () => {
				dispatch(initAnlysis())
			})
		},
		// eslint-disable-next-line no-console
		(err) => console.log(err),
	)
}
