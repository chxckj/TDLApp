import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
// Components
import Main from './screens/Main'
import ConfigTask from './screens/ConfigTask'
import OtherRepeat from './components/OtherRepeat'
import QuicklyTaskList from './screens/QuickTaskList'
import CategoriesList from './screens/CategoriesList'
import Drawer from './screens/Drawer'
import Themes from './themes/Themes'
import Theme from './themes/Theme/Theme'
import Profile from './screens/Profile'
import Settings from './screens/Settings'
import Backups from './screens/Backup'

const MainNavigator = createStackNavigator(
	{
		Main: { screen: Main },
		ConfigTask: { screen: ConfigTask },
		OtherRepeat: { screen: OtherRepeat },
		QuicklyTaskList: { screen: QuicklyTaskList },
		CategoriesList: { screen: CategoriesList },
		Profile: { screen: Profile },
		Drawer: { screen: Drawer },
		Themes: { screen: Themes },
		Theme: { screen: Theme },
		Settings: { screen: Settings },
		Backups: { screen: Backups },
	},
	{
		initialRouteName: 'Main',
		headerMode: 'none',
	},
)

const router = createAppContainer(MainNavigator)

export default router
