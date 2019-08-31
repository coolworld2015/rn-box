import React, {Component} from "react";
import {Text,View,StyleSheet} from "react-native";
import Video from 'react-native-video';

export default class Player extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Video source={{uri: 'https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'}}   // Can be a URL or a localfile.
                       ref={(ref) => {
                           this.player = ref
                       }}                                      // Store reference
                       onBuffer={this.onBuffer}                // Callback when remote video is buffering
                       onEnd={this.onEnd}                      // Callback when playback finishes
                       onError={this.videoError}               // Callback when video cannot be loaded
                       style={styles.backgroundVideo}/>
            </View>
        );
    }
}
    const styles = StyleSheet.create({
        container:{ flex: 1, justifyContent: "center"},
        backgroundVideo: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        },
    });
