import React from 'react';
import {
    createBottomTabNavigator,
    createStackNavigator,
    createAppContainer,
    createMaterialTopTabNavigator
} from 'react-navigation';

import {StackViewStyleInterpolator} from 'react-navigation-stack';

import {Image} from 'react-native';

import Search from '../search/search';
import searchMusicResults from '../../ios/search/searchMusicResults';
import searchMusicDetails from '../../ios/search/searchMusicDetails';

import searchMoviesResults from '../../ios/search/searchMoviesResults';
import searchMoviesDetails from '../../ios/search/searchMoviesDetails';

import Movies from '../../ios/movies/movies';
import moviesDetails from '../../ios/movies/moviesDetails';

import Music from '../../ios/music/music';
import musicDetails from '../../ios/music/musicDetails';

import playTrack from '../../ios/app/playTrack';

const SearchTab = createStackNavigator({
        Search,
        searchMusicResults,
        searchMusicDetails,
        searchMoviesResults,
        searchMoviesDetails,
        playTrack
    }, {
        headerMode: 'none',
        mode: 'modal',
        defaultNavigationOptions: {
            gesturesEnabled: false,
        }
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
});

const tabBarOptions = {
    style: {
        backgroundColor: 'white',

    },
    labelStyle: {
        color: 'darkblue',
        fontWeight: 'bold'
    },

    upperCaseLabel: false,
    indicatorStyle: {backgroundColor: 'darkblue'},
};

const TabNavigator = createMaterialTopTabNavigator({
        Search: SearchTab,
        Movies: MoviesTab,
        Music: MusicTab
    },
    {
        tabBarPosition: 'top',
        tabBarOptions
    });

export default createAppContainer(TabNavigator);
