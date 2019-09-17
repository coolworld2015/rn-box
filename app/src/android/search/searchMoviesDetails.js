'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ScrollView,
    AsyncStorage,
    BackHandler
} from 'react-native';

class SearchMoviesDetails extends Component {
    constructor(props) {
        super(props);

        BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.props.navigation) {
                this.props.navigation.goBack();
            }
            return true;
        });

        this.state = {
            pushEvent: appConfig.item
        }
    }

    localStorageInsert() {
        let movies = [];

        AsyncStorage.getItem('rn-box.movies')
            .then(req => JSON.parse(req))
            .then(json => {
                movies = [].concat(json);
                movies.push(this.state.pushEvent);

                if (movies[0] == null) {
                    movies.shift()
                }

                AsyncStorage.setItem('rn-box.movies', JSON.stringify(movies),)
                    .then(() => {
                            appConfig.movies.refresh = true;
                            this.props.navigation.goBack()
                        }
                    )
            })
            .catch(error => console.log(error));
    }

    playTrack() {
        appConfig.item = {
            name: this.state.pushEvent.trackName,
            url: this.state.pushEvent.previewUrl
        };
        this.props.navigation.navigate('playTrack');
    }

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        let image = <View/>;

        if (this.state.pushEvent) {
            if (this.state.pushEvent.artworkUrl100) {
                image = <Image
                    source={{uri: this.state.pushEvent.artworkUrl100.replace('100x100bb.jpg', '500x500bb.jpg')}}
                    style={{
                        height: 300,
                        width: 300,
                        borderRadius: 10,
                        margin: 5,
                    }}
                />
            } else {
                image = <Image
                    source={{uri: this.state.pushEvent.pic}}
                    style={{
                        height: 300,
                        width: 200,
                        borderRadius: 20,
                        margin: 20
                    }}
                />
            }
        }

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <TouchableHighlight
                            onPress={() => this.goBack()}
                            underlayColor='darkblue'>
                            <Text style={styles.textSmall}>
                                Back
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.itemWrap}>
                        <TouchableHighlight
                            underlayColor='darkblue'>
                            <Text style={styles.textLarge}>
                                {this.state.pushEvent.trackName}
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <TouchableHighlight
                            onPress={() => this.localStorageInsert()}
                            underlayColor='darkblue'>
                            <Text style={styles.textSmall}>
                                Add
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>

                <ScrollView>
                    <View style={{
                        flex: 1,
                        padding: 10,
                        paddingBottom: 55,
                        justifyContent: 'flex-start',
                        backgroundColor: 'white',
                    }}>
                        <View style={{alignItems: 'center'}}>
                            <TouchableHighlight
                                onPress={() => this.playTrack()}
                                underlayColor='darkblue'>

                                {image}

                            </TouchableHighlight>
                        </View>

                        <Text style={styles.itemTextBold}>
                            {this.state.pushEvent.trackName}
                        </Text>

                        <Text style={styles.itemText}>
                            {this.state.pushEvent.releaseDate.split('-')[0]}
                        </Text>

                        <Text style={styles.itemText}>
                            {this.state.pushEvent.country}
                        </Text>

                        <Text style={styles.itemText}>
                            {this.state.pushEvent.primaryGenreName}
                        </Text>

                        <Text style={styles.itemTextSmallBold}>
                            {this.state.pushEvent.artistName}
                        </Text>

                        <Text style={styles.itemTextLeft}>
                            {this.state.pushEvent.longDescription}
                        </Text>

                        <TouchableHighlight
                            onPress={() => this.playTrack()}
                            style={styles.button}>
                            <Text style={styles.buttonText}>
                                Play
                            </Text>
                        </TouchableHighlight>

                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'darkblue',
        borderTopWidth: 1,
        borderColor: 'white'
    },
    textSmall: {
        fontSize: 16,
        textAlign: 'center',
        margin: 14,
        fontWeight: 'bold',
        color: 'white'
    },
    textLarge: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        marginRight: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    form: {
        flex: 1,
        padding: 10,
        justifyContent: 'flex-start',
        paddingBottom: 130,
        backgroundColor: 'white'
    },
    itemWrap: {
        flex: 1,
        flexDirection: 'column',
    },
    itemTextBold: {
        fontSize: 18,
        textAlign: 'center',
        margin: 5,
        fontWeight: 'bold',
        color: 'black'
    },
    itemText: {
        fontSize: 14,
        textAlign: 'center',
        margin: 3,
        marginLeft: 2,
        color: 'black'
    },
    itemTextLeft: {
        fontSize: 14,
        textAlign: 'left',
        margin: 3,
        marginLeft: 2,
        color: 'black'
    },
    itemTextSmallBold: {
        fontSize: 14,
        textAlign: 'center',
        margin: 3,
        marginLeft: 2,
        fontWeight: 'bold',
        color: 'black'
    },
    button: {
        height: 50,
        backgroundColor: 'darkblue',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    loader: {
        marginTop: 20
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default SearchMoviesDetails;
