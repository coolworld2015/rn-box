import React from 'react';
import {createBottomTabNavigator, createStackNavigator, createAppContainer} from 'react-navigation';

import Phones from '../phones/phones';
import PhoneDetails from '../phones/phoneDetails';

import Search from '../search/search';
import SearchResults from '../search/searchResults';

import Users from '../users/users';
import UserDetails from '../users/userDetails';
import UserAdd from '../users/userAdd';

import Audit from '../audit/audit';
import AuditDetails from '../audit/auditDetails';
import {Image} from 'react-native';

const PhonesTab = createStackNavigator({
    Phones,
    PhoneDetails,
    Search,
    SearchResults
});

const UsersTab = createStackNavigator({
    Users,
    UserDetails,
    UserAdd
});

const AuditTab = createStackNavigator({
    Audit,
    AuditDetails
});

class Quit extends React.Component {
    render() {
        window.appConfig.onLogOut();
        return null;
    }
}

const TabNavigator = createBottomTabNavigator({
        Phones: PhonesTab,
        Users: UsersTab,
        Audit: AuditTab,
        Quit: Quit
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;

                if (routeName === 'Phones') {
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
