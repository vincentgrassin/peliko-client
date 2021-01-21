import React from 'react';
import {TabView, SceneMap} from 'react-native-tab-view';
import {StyleSheet, Dimensions} from 'react-native';
import { Rolls } from '../screens/rolls';
import { Notifications } from '../screens/notifications';

// need to put this out of here since it is more related to style than navigation per say
const initialLayout = { width: Dimensions.get('window').width };


export const MainTabView = () => {

    const [index, setIndex] = React.useState(0);
    // TODO: put picture instead of title
    const [routes] = React.useState([
        {key:'rolls', title:'Rolls'},
        {key:'notifications', title:'Notifications'}
    ]);

    const renderScene = SceneMap({
        rolls: Rolls,
        notifications: Notifications
    });

    return (<TabView 
        navigationState={{ index, routes }}
        renderScene={ renderScene }
        onIndexChange={ setIndex }
        initialLayout={ initialLayout }  
        />);
}