import { openDatabase } from 'expo-sqlite'
import * as Analytics from 'expo-firebase-analytics'
import * as actionTypes from './actionTypes'

const db = openDatabase('maker.db')

export const onInitLists = (lists) => ({
	type: actionTypes.INIT_LISTS,
	lists,
})

export const initLists = () => (dispatch) => {
	db.transaction(
		(tx) => {
			tx.executeSql('select * from lists', [], (_, { rows }) => {
				dispatch(onInitLists(rows._array))
			})
		},
		// eslint-disable-next-line no-console
		(err) => console.log(err),
	)
}

export const initList = (id, callback = () => null) => () => {
}

export const saveList = (list, callback) => (dispatch) => {
	if (list.id !== false) {
		db.transaction(
			(tx) => {
				tx.executeSql(
					`update lists
                                   set name = ?
                                   where id = ?;`,
					[list.name, list.id],
					() => {
						Analytics.logEvent('updatedList', {
							name: 'listAction',
						})

						dispatch(initLists(), callback(list))
					},
				)
			},
			// eslint-disable-next-line no-console
			(err) => console.log(err),
		)
	} else {
		db.transaction(
			(tx) => {
				tx.executeSql('insert into lists (name) values (?)', [list.name])
				tx.executeSql('select * from lists ORDER BY id DESC', [], (_, { rows }) => {
					Analytics.logEvent('createdList', {
						name: 'listAction',
					})

					dispatch(initLists(), callback(rows._array[0]))
				})
			},
			// eslint-disable-next-line no-console
			(err) => console.log(err),
		)
	}
}

export const removeList = (id) => (dispatch) => {
	db.transaction(
		(tx) => {
			tx.executeSql('delete from lists where id = ?', [id], () => {
				Analytics.logEvent('removedList', {
					name: 'listAction',
				})

				dispatch(initLists())
			})
		},
		// eslint-disable-next-line no-console
		(err) => console.log(err),
	)
}
