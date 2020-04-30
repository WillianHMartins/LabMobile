import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Login from './pages/Login'
import List from './pages/List';
import Solicitation from './pages/Solicitation';

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        List,
        Solicitation
    })
)

export default Routes