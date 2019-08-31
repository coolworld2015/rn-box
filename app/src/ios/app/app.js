'use strict';

import React, {Component} from 'react';

import Login from './login';
import AppContainer from './navigation';

console.disableYellowBox = true;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false
        };

        window.appConfig = {
            access_token: '',
            url: 'http://jwt-base.herokuapp.com/',
            onLogOut: this.onLogOut.bind(this),
            phones: {
                items: [],
                item: {}
            },
            users: {
                items: [],
                item: {}
            },
            audit: {
                items: [],
                item: {}
            }
        };
    }

    render() {
        if (this.state.isLoggedIn) {
            return (
                <AppContainer onLogOut={this.onLogOut.bind(this)}/>
            );
        } else {
            return (
                <Login onLogin={this.onLogin.bind(this)}/>
            );
        }
    }

    onLogin() {
        console.log('onLogin');
        this.setState({isLoggedIn: true});
    }

    onLogOut() {
        console.log('onLogOut');
        this.setState({isLoggedIn: false});
    }
}

export default App;
