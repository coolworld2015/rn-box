'use strict';

import React, {Component} from 'react';

console.disableYellowBox = true;

import AppContainer from './appContainer';

class App extends Component {
    constructor(props) {
        super(props);

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
