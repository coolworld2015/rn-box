'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ScrollView,
    ActivityIndicator,
    TextInput,
    Dimensions,
    KeyboardAvoidingView
} from 'react-native';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showProgress: false,
            username: '1',
            password: '1'
        };
    }

    onLogin() {
        if (this.state.username === undefined || this.state.username === '' ||
            this.state.password === undefined || this.state.password === '') {
            this.setState({
                badCredentials: true
            });
            return;
        }

        this.setState({
            showProgress: true
        });

        fetch(appConfig.url + 'api/login', {
            method: 'post',
            body: JSON.stringify({
                name: this.state.username,
                pass: this.state.password,
                description: 'IOS'
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.token) {
                    appConfig.access_token = responseData.token;
                    this.setState({
                        badCredentials: false
                    });
                    this.props.onLogin();
                } else {
                    this.setState({
                        badCredentials: true,
                        showProgress: false
                    });
                }
            })
            .catch((error) => {
                this.setState({
                    badCredentials: true,
                    showProgress: false
                });
            });
    }

    render() {
        let errorCtrl;

        if (this.state.badCredentials) {
            errorCtrl = <Text style={styles.error}>
                That username and password combination did not work
            </Text>;
        }

        return (
            <ScrollView style={{backgroundColor: 'whitesmoke'}} keyboardShouldPersistTaps='always'>
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                    <View style={styles.container}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.heading}>
                                RN-Base
                            </Text>
                        </View>

                        <Image
                            style={styles.logo}
                            source={require('../../../img/logo.jpg')}
                        />

                        <TextInput
                            onChangeText={(text) => this.setState({
                                username: text,
                                badCredentials: false
                            })}
                            value={this.state.username}
                            editable={!this.state.showProgress}
                            style={styles.loginInput}
                            placeholder="Login">
                        </TextInput>

                        <TextInput
                            onChangeText={(text) => this.setState({
                                password: text,
                                badCredentials: false
                            })}
                            value={this.state.password}
                            editable={!this.state.showProgress}
                            style={styles.loginInput}
                            placeholder="Password"
                            secureTextEntry={true}>
                        </TextInput>

                        <TouchableHighlight
                            onPress={() => this.onLogin()}
                            disabled={this.state.showProgress}
                            style={styles.button}>
                            <Text style={styles.buttonText}>
                                Log in
                            </Text>
                        </TouchableHighlight>

                        {errorCtrl}

                        <ActivityIndicator
                            animating={this.state.showProgress}
                            size="large"
                            color="darkblue"
                            style={styles.loader}
                        />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        padding: 10,
        alignItems: 'center',
        flex: 1
    },
    logo: {
        width: 150,
        height: 150,
        paddingTop: 140,
        borderRadius: 20,
        marginTop: 10
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: -10
    },
    heading: {
        fontSize: 30,
        marginTop: 10,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    loginInput: {
        height: 50,
        width: Dimensions.get('window').width * .90,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        color: 'black',
        backgroundColor: 'white'
    },
    button: {
        height: 50,
        width: Dimensions.get('window').width * .92,
        backgroundColor: 'darkblue',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 20,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    loader: {
        marginTop: 40
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default Login;
