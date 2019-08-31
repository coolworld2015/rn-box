'use strict';

import React, {Component} from 'react';

console.disableYellowBox = true;

import AppContainer from './appContainer';

import Video from './video';

class App extends Component {
    constructor(props) {
        super(props);

/*		BackAndroid.addEventListener('hardwareBackPress', () => {
			if (this.props.navigator) {
				this.props.navigator.pop();
			}
			return true;
		});*/

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
			<AppContainer />
		)
    }
}

export default App;
