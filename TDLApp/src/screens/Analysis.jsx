import React, { PureComponent } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { askAsync, CAMERA_ROLL } from 'expo-permissions'
import Constants from 'expo-constants'
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker'
import { Toolbar } from 'react-native-material-ui'
import Input from '../components/Input'
import Template from '../etc/Template'
import Spinner from '../components/Spinner'
import { separator } from '../etc/Style'
import styles from './AnalysisStyle'

import * as actions from '../actions'
import { connect } from 'react-redux'

const defaultAvatar = require('../assets/profile.png')

class Analysis extends PureComponent {
	state = {
		name: '',
		showDefaultAvatar: false,
		loading: true,
	}

	componentDidMount() {
		const { onInitSettings, onInitAnalysis } = this.props

		onInitSettings()
		onInitAnalysis(() => {
			const { analysis } = this.props
			this.setState({ loading: false, name: analysis.name })
		})
	}

	toggleSnackbar = (message, visible = true) => {
		const { onUpdateSnackbar } = this.props

		onUpdateSnackbar(visible, message)
	}

	render() {
		const { loading, showDefaultAvatar, name } = this.state
		const {
			navigation,
			theme,
			tasks,
			lists,
			finished,
			analysis,
			categories,
			onChangeName,
			translations,
		} = this.props

		let list
		const listData = []
		listData.push({ label: translations.allTask, data: tasks.length + finished.length })
		listData.push({ label: translations.finishedTask, data: finished.length })
		listData.push({ label: translations.endedTask, data: analysis.endedTask })
		listData.push({ label: translations.allCategories, data: categories.length })

		if (analysis.id === 0) {
			list = listData.map((item, index) => (
				<View key={index}>
					<View style={[styles.item, { backgroundColor: theme.primaryBackgroundColor }]}>
						<Text style={{ color: theme.thirdTextColor, fontSize: 16 }}>{item.label}</Text>
						<Text style={{ color: theme.primaryColor, fontSize: 18 }}>{item.data}</Text>
					</View>
					<View style={separator} />
				</View>
			))
		}

		return (
			<Template>
				<Toolbar
					leftElement='arrow-back'
					onLeftElementPress={navigation.goBack}
					centerElement={translations.title}
				/>

				{!loading ? (
					<ScrollView>
						{analysis.id === 0 && (
							<View
								style={{
									backgroundColor: theme.secondaryBackgroundColor,
									paddingBottom: 10,
								}}
							>
								<TouchableOpacity onPress={this.getPermissionAsync}>
									<Image
										style={styles.image}
										source={
											analysis.avatar && !showDefaultAvatar ? { uri: analysis.avatar } : defaultAvatar
										}
										onError={() => {
											this.setState({ showDefaultAvatar: true })
										}}
									/>
								</TouchableOpacity>
								<Input
									hideClearIcon
									elementConfig={{ label: '' }}
									style={styles.name}
									value={name}
									color={theme.primaryColor}
									changed={(value) => {
										this.setState({ name: value })
										onChangeName(value)
									}}
								/>
							</View>
						)}
						<View>{list}</View>
					</ScrollView>
				) : (
					<Spinner />
				)}
			</Template>
		)
	}
}

const mapStateToProps = (state) => ({
	theme: state.theme.theme,
	settings: state.settings.settings,
	tasks: state.tasks.tasks,
	finished: state.tasks.finished,
	analysis: state.analysis,
	categories: state.categories.categories,
	lists: state.lists.lists,
	translations: state.settings.translations.Analysis,
})

const mapDispatchToProps = (dispatch) => ({
	onInitSettings: () => dispatch(actions.initSettings()),
	onInitAnalysis: (callback) => dispatch(actions.initAnalysis(callback)),
	onChangeName: (name) => dispatch(actions.changeName(name)),
	onChangeAvatar: (avatar, callback) => dispatch(actions.changeAvatar(avatar, callback)),
	onUpdateSnackbar: (showSnackbar, snackbarText) =>
		dispatch(actions.updateSnackbar(showSnackbar, snackbarText)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Analysis)
