'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ScrollView,
    BackHandler
} from 'react-native';

class PhoneDetails extends Component {
    constructor(props) {
        super(props);

        BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.props.navigator) {
                this.props.navigator.pop();
            }
            return true;
        });

        this.state = {
            name: ''
        };

        if (props) {
            this.state = {
                id: props.navigation.state.params.data.id,
                name: props.navigation.state.params.data.name,
                phone: props.navigation.state.params.data.phone,
                street: props.navigation.state.params.data.street,
                house: props.navigation.state.params.data.house,
                apt: props.navigation.state.params.data.apt,
                index: props.navigation.state.params.data.index
            };
        }
    }

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
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
                        <TouchableWithoutFeedback>
                            <View>
                                <Text style={styles.textLarge}>
                                    {this.state.name}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View>
                        <TouchableWithoutFeedback>
                            <View>
                                <Text style={styles.textSmall}>
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                <ScrollView>
                    <View style={styles.form}>
                        <View style={styles.itemBlock}>
                            <Text style={styles.itemTextBold}>
                                Name:
                            </Text>
                            <View style={styles.itemWrap}>
                                <Text style={styles.itemText}>
                                    {this.state.name}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.itemBlock}>
                            <Text style={styles.itemTextBold}>
                                Phone:
                            </Text>
                            <View style={styles.itemWrap}>
                                <Text style={styles.itemText}>
                                    {this.state.phone}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.itemBlock}>
                            <Text style={styles.itemTextBold}>
                                Street:
                            </Text>
                            <View style={styles.itemWrap}>
                                <Text style={styles.itemText}>
                                    {this.state.street}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.itemBlock}>
                            <Text style={styles.itemTextBold}>
                                House:
                            </Text>
                            <View style={styles.itemWrap}>
                                <Text style={styles.itemText}>
                                    {this.state.house}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.itemBlock}>
                            <Text style={styles.itemTextBold}>
                                Apt:
                            </Text>
                            <View style={styles.itemWrap}>
                                <Text style={styles.itemText}>
                                    {this.state.apt}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.itemBlock}>
                            <Text style={styles.itemTextBold}>
                                Zip:
                            </Text>
                            <View style={styles.itemWrap}>
                                <Text style={styles.itemText}>
                                    {this.state.index}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.itemBlock}>
                            <Text style={styles.itemTextBold}>
                                ID:
                            </Text>
                            <View style={styles.itemWrap}>
                                <Text style={styles.itemText}>
                                    {this.state.id}
                                </Text>
                            </View>
                        </View>

                        <TouchableHighlight
                            onPress={() => this.goBack()}
                            style={styles.button}>
                            <View>
                                <Text style={styles.buttonText}>
                                    Back
                                </Text>
                            </View>
                        </TouchableHighlight>

                        <Text>{this.state.bugANDROID}</Text>
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
    itemBlock: {
        flexDirection: 'row'
    },
    itemWrap: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    itemTextBold: {
        fontSize: 18,
        textAlign: 'left',
        margin: 5,
        fontWeight: 'bold',
        color: 'black'
    },
    itemText: {
        fontSize: 18,
        textAlign: 'left',
        margin: 5,
        marginLeft: 2,
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

export default PhoneDetails;
