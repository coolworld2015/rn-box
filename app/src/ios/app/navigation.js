import React from 'react';
import {createBottomTabNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import {Image} from 'react-native';

import Search from '../search/search';

const SearchTab = createStackNavigator({
    Search,
});

const TabNavigator = createBottomTabNavigator({
        Search: SearchTab
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;

                if (routeName === 'Search') {
                    iconName = <Image
                        source={require('../../../img/phones.png')}
                        style={{
                            height: 15,
                            width: 15,
                            margin: 0
                        }}
                    />;
                }
                if (routeName === 'Users') {
                    iconName = <Image
                        source={require('../../../img/users.png')}
                        style={{
                            height: 20,
                            width: 20,
                            margin: 0
                        }}
                    />;
                }
                if (routeName === 'Audit') {
                    iconName = <Image
                        source={require('../../../img/clock.png')}
                        style={{
                            height: 20,
                            width: 20,
                            margin: 0
                        }}
                    />;
                }
                if (routeName === 'Quit') {
                    iconName = <Image
                        source={require('../../../img/log-out.png')}
                        style={{
                            height: 20,
                            width: 20,
                            margin: 0
                        }}
                    />;
                }

                return iconName;
            }
        })
    });

export default createAppContainer(TabNavigator);
