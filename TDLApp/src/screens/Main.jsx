import React, { Component } from 'react'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import Spinner from '../components/Spinner'
import TaskList from './TaskList'
import Template from '../etc/Template'

import * as actions from '../actions'
import { connect } from 'react-redux'

class Main extends Component {
	state = {
		tabs: {
			index: 0,
			routes: [
				{ key: 'tasks', title: this.props.translations.tasks },
			],
		},
		loading: true,
	}

	componentDidMount() {
		this.props.onInitTheme()
		this.props.onInitCategories()
		this.props.onInitAnalysis()
		this.props.onInitToDo()
		this.props.onInitLists()
		this.props.onInitSettings(() => {
			this.setState({ loading: false })
		})
	}

	componentDidUpdate(prevProps) {
		if (prevProps.translations !== this.props.translations) {
			const { tabs } = this.state
			const { translations } = this.props

			tabs.routes[0].title = translations.tasks
			this.setState({ tabs })
		}
	}

	render() {
		const { tabs, loading } = this.state
		const { navigation, theme, hideTabView } = this.props

		return (
			<>
				{theme && !loading ? (
					<Template bgColor={theme.secondaryBackgroundColor}>
						<TabView
							navigationState={tabs}
							tabStyle={{ backgroundColor: theme.primaryColor }}
							onIndexChange={(index) => {
								tabs.index = index
								this.setState({ tabs })
							}}
							renderScene={SceneMap({
								tasks: () => <TaskList navigation={navigation} />,
							})}
							renderTabBar={(props) => (
								<TabBar
									{...props}
									onTabPress={({ route }) => {
										props.jumpTo(route.key)
									}}
									indicatorStyle={{ backgroundColor: theme.primaryTextColor }}
									style={{
										backgroundColor: theme.primaryColor,
										height: hideTabView ? 0 : 50,
									}}
								/>
							)}
						/>
					</Template>
				) : (
					<Spinner />
				)}
			</>
		)
	}
}

const mapStateToProps = (state) => ({
	theme: state.theme.theme,
	lang: state.settings.settings.lang,
	hideTabView: state.settings.settings.hideTabView,
	translations: state.settings.translations.Main,
})

const mapDispatchToProps = (dispatch) => ({
	onInitToDo: () => dispatch(actions.initToDo()),
	onInitLists: () => dispatch(actions.initLists()),
	onInitCategories: () => dispatch(actions.initCategories()),
	onInitTheme: () => dispatch(actions.initTheme()),
	onInitAnalysis: () => dispatch(actions.initAnalysis()),
	onInitSettings: (callback) => dispatch(actions.initSettings(callback)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
