import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import SelectPhoto from '../screens/Photo/SelectPhoto';
import TakePhoto from '../screens/Photo/TakePhoto';
import UploadPhoto from '../screens/Photo/UploadPhoto';
import { createStackNavigator } from 'react-navigation-stack';
import { stackStyle } from './config';
import styles from '../styles';

const PhotoTabs = createMaterialTopTabNavigator({
    Take: {
        screen: TakePhoto,
        navigationOptions: {
            tabBarLabel: 'Take'
        }
    },
    Select: {
        screen: SelectPhoto,
        navigationOptions: {
            tabBarLabel: 'Select'
        }
    },
    
}, {
    tabBarPosition: 'bottom',
    tabBarOptions: {
        style: {
            paddingBottom: 20,
            ...stackStyle
        },
        labelStyle: {
          color: styles.blackColor,
          fontWeight: '600'  
        },
        indicatorStyle: {
            backgroundColor: styles.blackColor,
            marginBottom: 20
        }
    }
});

export default createStackNavigator({
    Tabs: {
        screen: PhotoTabs,
        navigationOptions: {
            title: 'Choose Photo'
        }
    },
    UploadPhoto
}, {
    defaultNavigationOptions: {
        headerStyle: {
            ...stackStyle
        }
    },
});