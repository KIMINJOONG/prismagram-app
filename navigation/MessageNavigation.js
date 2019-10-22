import { createStackNavigator } from 'react-navigation-stack';
import Messages from '../screens/Messages/Messages';
import Message from '../screens/Messages/Message';
import { stackStyle } from './config';

export default createStackNavigator({
    Messages,
    Message
}, {
    defaultNavigationOptions: {
        headerStyle: {
            ...stackStyle
        }
    },
})