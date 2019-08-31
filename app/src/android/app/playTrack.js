'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ScrollView,
    Dimensions
} from 'react-native';

import Video from 'react-native-video';
import Player from './video';

class PlayTrack extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: '',
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width
        };

        if (props.data) {
            this.state = {
                name: props.data.name,
                url: props.data.url,
                html: 'https://www.facebook.com/wikrcom/videos/1118835278260392/',
                html1: 'https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
            }
        }
    }

    componentDidMount() {
        this.setState({
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width
        });
    }

    goBack() {
        this.props.navigator.pop();
    }

    render() {
        return (

            <View style={styles.container}>

                <Video source={{uri: this.state.url}}   // Can be a URL or a local file.
                       ref={(ref: Video) => {
                           this.video = ref
                       }}
                       style={styles.backgroundVideo}
                />

                <View style={styles.header}>
                    <View>
                        <TouchableHighlight
                            onPress={() => this.goBack()}
                            underlayColor='darkblue'>
                            <View>
                                <Text style={styles.textSmall}>
                                    Back
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <TouchableWithoutFeedback underlayColor='#ddd'>
                            <View>
                                <Text style={styles.textLarge}>
                                    {this.state.name}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View>
                        <TouchableHighlight
                            underlayColor='darkblue'>
                            <View>
                                <Text style={styles.textSmall}>
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    backgroundVideo: {
        position: 'absolute',
        top: 70,
        left: 0,
        bottom: 0,
        right: 0,
    },
    header: {
        top: -257,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'darkblue',
        borderWidth: 0,
        borderColor: 'whitesmoke'
    },
    textSmall: {
        fontSize: 16,
        textAlign: 'center',
        margin: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    textLarge: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        marginTop: 12,
        marginRight: 40,
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
        flexWrap: 'wrap'
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

export default PlayTrack;
