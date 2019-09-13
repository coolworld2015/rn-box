'use strict';

import React, {Component} from 'react';
import NavigationExperimental from 'react-native-deprecated-custom-components';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';

import Search from '../search/search';

import SearchResultsMusic from '../search/searchResultsMusic';
import SearchDetailsMusic from '../search/searchDetailsMusic';

import SearchResultsMovies from '../search/searchResultsMovies';
import SearchDetailsMovies from '../search/searchDetailsMovies';

import Music from '../music/music';
import MusicDetails from '../music/musicDetails';

import Movies from '../movies/movies';
import MoviesDetails from '../movies/moviesDetails';

import PlayTrack from './playTrack';

class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollableTabView
                renderTabBar={() => <DefaultTabBar
                    activeTextColor='darkblue'
                    inactiveTextColor='darkblue'
                    underlineStyle={{backgroundColor: 'darkblue'}}
                    backgroundColor='white'/>}
            >
                <SearchTab tabLabel="Search"/>
                <MusicTab tabLabel="Music"/>
                <MoviesTab tabLabel="Movies"/>
            </ScrollableTabView>
        );
    }
}

class SearchTab extends Component {
    constructor(props) {
        super(props);
        this.routes = [
            {title: 'Search', index: 0},
            {title: 'Search Music', index: 1},
            {title: 'Search Music Details', index: 2},
            {title: 'Search Movies', index: 3},
            {title: 'Search Movies Details', index: 4},
            {title: 'Play Track', index: 5}
        ];
    }

    renderScene(route, navigator) {
        switch (route.index) {
            case 0:
                return <Search routes={this.routes} navigator={navigator}/>
                break;
            case 1:
                return <SearchResultsMusic data={route.data} routes={this.routes} navigator={navigator}/>
                break;
            case 11:
                return <SearchDetailsMusic data={route.data} routes={this.routes} navigator={navigator}/>
                break;
            case 2:
                return <SearchResultsMovies data={route.data} routes={this.routes} navigator={navigator}/>
                break;
            case 22:
                return <SearchDetailsMovies data={route.data} routes={this.routes} navigator={navigator}/>
                break;
            case 3:
                return <PlayTrack data={route.data} routes={this.routes} navigator={navigator}/>
                break;
        }
    }

    render() {
        return (
            <NavigationExperimental.Navigator
                initialRoute={this.routes[0]}
                initialRouteStack={this.routes}
                renderScene={this.renderScene.bind(this)}
                configureScene={(route, routeStack) =>
                    NavigationExperimental.Navigator.SceneConfigs.PushFromRight}
            />
        )
    }
}

class MusicTab extends Component {
    constructor(props) {
        super(props);
        this.routes = [
            {title: 'Music', index: 0},
            {title: 'Music Details', index: 1},
            {title: 'PlayTrack', index: 2}
        ];
    }

    renderScene(route, navigator) {
        switch (route.index) {
            case 0:
                return <Music routes={this.routes} navigator={navigator}/>
                break;
            case 1:
                return <MusicDetails data={route.data} routes={this.routes} navigator={navigator}/>
                break;
            case 2:
                return <PlayTrack data={route.data} routes={this.routes} navigator={navigator}/>
                break;
        }
    }

    render() {
        return (
            <NavigationExperimental.Navigator
                initialRoute={this.routes[0]}
                initialRouteStack={this.routes}
                renderScene={this.renderScene.bind(this)}
                style={{padding: 0}}

                configureScene={(route, routeStack) =>
                    NavigationExperimental.Navigator.SceneConfigs.PushFromRight}
            />
        )
    }
}

class MoviesTab extends Component {
    constructor(props) {
        super(props);
        this.routes = [
            {title: 'Movies', index: 0},
            {title: 'Movies Details', index: 1},
            {title: 'PlayTrack', index: 2}
        ];
    }

    renderScene(route, navigator) {
        switch (route.index) {
            case 0:
                return <Movies routes={this.routes} navigator={navigator}/>
                break;
            case 1:
                return <MoviesDetails data={route.data} routes={this.routes} navigator={navigator}/>
                break;
            case 2:
                return <PlayTrack data={route.data} routes={this.routes} navigator={navigator}/>
                break;
        }
    }

    render() {
        return (
            <NavigationExperimental.Navigator
                initialRoute={this.routes[0]}
                initialRouteStack={this.routes}
                renderScene={this.renderScene.bind(this)}
                style={{padding: 0}}

                configureScene={(route, routeStack) =>
                    NavigationExperimental.Navigator.SceneConfigs.PushFromRight}
            />
        )
    }
}

export default AppContainer;
