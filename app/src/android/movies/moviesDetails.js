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
    Alert,
    BackHandler,
} from 'react-native';

class MoviesDetails extends Component {
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

    deleteMovieDialog() {
        Alert.alert(
            'Delete movie',
            'Are you sure you want to delete movie ' + this.state.pushEvent.trackName + '?',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                {
                    text: 'OK', onPress: () => {
                        this.deleteMovie();
                    }
                },
            ]
        );
    }

    deleteMovie() {
        let id = this.state.pushEvent.trackId;
        let movies = [];

        AsyncStorage.getItem('rn-box.movies')
            .then(req => JSON.parse(req))
            .then(json => {

                movies = [].concat(json);

                for (let i = 0; i < movies.length; i++) {
                    if (movies[i].trackId === id) {
                        movies.splice(i, 1);
                        break;
                    }
                }

                AsyncStorage.setItem('rn-box.movies', JSON.stringify(movies))
                    .then(json => {
                            appConfig.movies.refresh = true;
                            this.props.navigation.navigate('Movies', {refresh: true})
                        }
                    );

            })
            .catch(error => console.log(error))
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
                        height: 400,
                        width: 300,
                        borderRadius: 10,
                        margin: 5
                    }}
                />;
            } else {
                image = <Image
                    source={{uri: this.state.pushEvent.pic}}
                    style={{
                        height: 300,
                        width: 300,
                        borderRadius: 10,
                        margin: 5
                    }}
                />;
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
                        <Text style={styles.textLarge}>
                            {this.state.pushEvent.trackName}
                        </Text>
                    </View>
                    <View>
                        <TouchableHighlight
                            onPress={() => this.deleteMovieDialog()}
                            underlayColor='darkblue'>
                            <Text style={styles.textSmall}>
                                Delete
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
                        backgroundColor: 'white'
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
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
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
        marginLeft: 0,
        fontWeight: 'bold',
        color: 'white',
    },
    itemWrap: {
        flex: 1,
        flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        flex: 1,
        padding: 10,
        justifyContent: 'flex-start',
        paddingBottom: 130,
        backgroundColor: 'white'
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
        //backgroundColor: '#48BBEC',
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

export default MoviesDetails;
