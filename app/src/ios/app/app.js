'use strict';

import React, {Component} from 'react';

import AppContainer from './appContainer';

console.disableYellowBox = true;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false
        };

        window.appConfig = {
            music: {
                refresh: false
            },
            movies: {
                refresh: false
            }
        };
    }

    render() {
        return (
            <AppContainer/>
        )
    }
}

export default App;
