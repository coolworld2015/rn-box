import React from 'react';
import {createBottomTabNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import {Image} from 'react-native';

import Search from '../search/search';
import searchMusicResults from '../search/searchMusicResults';
import searchMusicDetails from '../search/searchMusicDetails';

import searchMoviesResults from '../search/searchMoviesResults';
import searchMoviesDetails from '../search/searchMoviesDetails';

import Movies from '../movies/movies';
import moviesDetails from '../movies/moviesDetails';

import Music from '../music/music';
import musicDetails from '../music/musicDetails';

import playTrack from './playTrack';
import {StackViewStyleInterpolator} from "react-navigation-stack";

const SearchTab = createStackNavigator({
        Search,
        searchMusicResults,
        searchMusicDetails,
        searchMoviesResults,
        searchMoviesDetails,
        playTrack
    }, {
        headerMode: 'none',
        transitionConfig: () => ({
            screenInterpolator: sceneProps => {
                return StackViewStyleInterpolator.forHorizontal(sceneProps);
            }
        })
    }
);

const MoviesTab = createStackNavigator({
    Movies,
    moviesDetails,
        playTrack
    }, {
        headerMode: 'none',
        transitionConfig: () => ({
            screenInterpolator: sceneProps => {
                return StackViewStyleInterpolator.forHorizontal(sceneProps);
            }
        })
    }
);

const MusicTab = createStackNavigator({
    Music,
    musicDetails,
        playTrack
    }, {
        headerMode: 'none',
        transitionConfig: () => ({
            screenInterpolator: sceneProps => {
                return StackViewStyleInterpolator.forHorizontal(sceneProps);
            }
        })
    }
);

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
                    />
                }
                if (routeName === 'Movies') {
                    iconName = <Image
                        source={require('../../../img/movies.png')}
                        style={{
                            height: 20,
                            width: 20,
                            margin: 0
                        }}
                    />
                }
                if (routeName === 'Music') {
                    iconName = <Image
                        source={require('../../../img/music.png')}
                        style={{
                            height: 20,
                            width: 20,
                            margin: 0
                        }}
                    />
                }

                return iconName
            }
        })
    });

export default createAppContainer(TabNavigator);
