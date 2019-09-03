import React from 'react';
import {createBottomTabNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import {Image} from 'react-native';

import Search from '../search/search';
import searchMusicResults from '../search/searchMusicResults';
import searchMusicDetails from '../search/searchMusicDetails';

import searchMoviesResults from '../search/searchMoviesResults';
import searchMoviesDetails from '../search/searchMoviesDetails';
import playTrack from './playTrack';

const SearchTab = createStackNavigator({
    Search,
    searchMusicResults,
    searchMusicDetails,
    searchMoviesResults,
    searchMoviesDetails,
    playTrack
});

const MoviesTab = createStackNavigator({
    searchMoviesResults,
    searchMoviesDetails,
    playTrack
});

const MusicTab = createStackNavigator({
    searchMusicResults,
    searchMusicDetails,
    playTrack
});

const TabNavigator = createBottomTabNavigator({
        Search: SearchTab,
        Movies: MoviesTab,
        Music: MusicTab
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;

                if (routeName === 'Search') {
                    iconName = <Image
                        source={require('../../../img/search.png')}
                        style={{
                            height: 20,
                            width: 20,
                            margin: 10
                        }}
                    />;
                }
                if (routeName === 'Movies') {
                    iconName = <Image
                        source={require('../../../img/movies.png')}
                        style={{
                            height: 20,
                            width: 20,
                            margin: 0
                        }}
                    />;
                }
                if (routeName === 'Music') {
                    iconName = <Image
                        source={require('../../../img/music.png')}
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
