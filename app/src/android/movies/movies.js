'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ScrollView,
    ActivityIndicator,
    TextInput,
    AsyncStorage,
    Image,
    Dimensions,
    RefreshControl
} from 'react-native';

import ListView from 'deprecated-react-native-listview';

class Movies extends Component {
    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            dataSource: ds.cloneWithRows([]),
            showProgress: true,
            resultsCount: 0,
            recordsCount: 15,
            positionY: 0,
            searchQuery: '',
            refreshing: false,
            responseData: [],
            width: Dimensions.get('window').width
        };
        this.getItems();
    }

    componentDidMount() {
        this.didFocusListener = this.props.navigation.addListener(
            'didFocus',
            () => {
                this.refreshComponent()
            }
        )
    }

    refreshComponent() {
        if (appConfig.movies.refresh) {
            appConfig.movies.refresh = false;

            this.setState({
                showProgress: true
            });

            setTimeout(() => {
                this.getItems()
            }, 500);
        }
    }

    getItems() {
        this.setState({
            serverError: false,
            resultsCount: 0,
            recordsCount: 15,
            positionY: 0,
            searchQuery: '',
        });

        AsyncStorage.getItem('rn-box.movies')
            .then(req => JSON.parse(req))
            .then(json => {
                if (json) {
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(json.sort(this.sort).slice(0, 5)),
                        resultsCount: json.length,
                        responseData: json.sort(this.sort),
                        filteredItems: json.sort(this.sort),
                    });
                }
            })
            .catch(error => console.log(error))
            .finally(() => {
                this.setState({
                    showProgress: false
                });
            });
    }

    sort(a, b) {
        let nameA = a.trackName.toLowerCase(), nameB = b.trackName.toLowerCase();
        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }
        return 0;
    }

    showDetails(rowData) {
        appConfig.item = rowData;
        this.props.navigation.navigate('moviesDetails');
    }

    renderRow(rowData) {
        let image;
        if (rowData) {
            if (rowData.artworkUrl100) {
                image = <Image
                    source={{uri: rowData.artworkUrl100.replace('100x100bb.jpg', '500x500bb.jpg')}}
                    style={styles.img}
                />
            } else {
                image = <Image
                    source={{uri: rowData.pic}}
                    style={styles.img}
                />
            }
        }

        return (
            <TouchableHighlight
                onPress={() => this.showDetails(rowData)}
                underlayColor='#ddd'>
                <View style={styles.imgsList}>

                    {image}

                    <View style={styles.textBlock}>
                        <Text style={styles.textItemBold}>
                            {rowData.trackName}
                        </Text>

                        <Text style={styles.textItem}>
                            {rowData.releaseDate.split('-')[0]}
                        </Text>

                        <Text style={styles.textItem}>
                            {rowData.country}
                        </Text>

                        <Text style={styles.textItem}>
                            {rowData.primaryGenreName}
                        </Text>

                        <Text style={styles.textItemBold}>
                            {rowData.artistName}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    refreshData(event) {
        if (this.state.showProgress === true) {
            return;
        }

        if (this.state.filteredItems === undefined) {
            return;
        }

        let items, positionY, recordsCount;
        recordsCount = this.state.recordsCount;
        positionY = this.state.positionY;
        items = this.state.filteredItems.slice(0, recordsCount);

        if (event.nativeEvent.contentOffset.y >= positionY) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items),
                recordsCount: recordsCount + 10,
                positionY: positionY + 400
            });
        }
    }

    onChangeText(text) {
        if (this.state.responseData === undefined) {
            return;
        }

        let arr = [].concat(this.state.responseData);
        let items = arr.filter((el) => el.trackName.toLowerCase().indexOf(text.toLowerCase()) !== -1);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items),
            resultsCount: items.length,
            filteredItems: items,
            searchQuery: text
        })
    }

    refreshDataAndroid() {
        this.setState({
            showProgress: true
        });

        setTimeout(() => {
            this.getItems()
        }, 500);
    }

    clearSearchQuery() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.state.responseData.slice(0, 15)),
            resultsCount: this.state.responseData.length,
            filteredItems: this.state.responseData,
            positionY: 0,
            recordsCount: 15,
            searchQuery: ''
        })
    }

    render() {
        let errorCtrl, loader, image;

        if (this.state.serverError) {
            errorCtrl = <Text style={styles.error}>
                Something went wrong.
            </Text>
        }

        if (this.state.showProgress) {
            loader = <View style={styles.loader}>
                <ActivityIndicator
                    size="large"
                    color="darkblue"
                    animating={true}
                />
            </View>
        }

        if (this.state.searchQuery.length > 0) {
            image = <Image
                source={require('../../../img/cancel.png')}
                style={{
                    height: 20,
                    width: 20,
                    marginTop: 10
                }}
            />
        }

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <TouchableHighlight
                            onPress={() => this.refreshDataAndroid()}
                            underlayColor='#ddd'>
                            <Text style={styles.textSmall}>
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <TouchableHighlight
                            underlayColor='#ddd'>
                            <Text style={styles.textLarge}>
                                Movies
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <TouchableHighlight
                            underlayColor='#ddd'>
                            <Text style={styles.textSmall}>
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>

                <View style={styles.iconForm}>
                    <View>
                        <TextInput
                            underlineColorAndroid='rgba(0,0,0,0)'
                            onChangeText={this.onChangeText.bind(this)}
                            style={{
                                height: 45,
                                padding: 5,
                                backgroundColor: 'white',
                                borderWidth: 3,
                                borderColor: 'white',
                                borderRadius: 0,
                                width: this.state.width * .90,
                            }}
                            value={this.state.searchQuery}
                            placeholder="Search here">
                        </TextInput>
                    </View>
                    <View style={{
                        height: 45,
                        backgroundColor: 'white',
                        borderWidth: 3,
                        borderColor: 'white',
                        marginLeft: -10,
                        paddingLeft: 5,
                        width: this.state.width * .10,
                    }}>
                        <TouchableWithoutFeedback
                            onPress={() => this.clearSearchQuery()}>
                            <View>
                                {image}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                {errorCtrl}

                {loader}

                <ScrollView onScroll={this.refreshData.bind(this)} scrollEventThrottle={16}
                            refreshControl={
                                <RefreshControl
                                    enabled={true}
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.refreshDataAndroid.bind(this)}
                                />
                            }>
                    <ListView
                        enableEmptySections={true}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                    />
                </ScrollView>

                <View>
                    <Text style={styles.countFooter}>
                        Records: {this.state.resultsCount}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imgsList: {
        flex: 1,
        flexDirection: 'row',
        padding: 0,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
    },
    iconForm: {
        flexDirection: 'row',
        borderColor: 'darkblue',
        borderWidth: 4
    },
    countHeader: {
        fontSize: 16,
        textAlign: 'center',
        padding: 15,
        backgroundColor: '#F5FCFF'
    },
    img: {
        height: 95,
        width: 90,
        borderRadius: 10,
        margin: 10
    },
    textBlock: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    textItemBold: {
        fontWeight: 'bold',
        color: 'black'
    },
    textItem: {
        color: 'black'
    },
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
        marginRight: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    textInput: {
        height: 45,
        marginTop: 0,
        padding: 5,
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'lightgray',
        borderRadius: 0
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
        backgroundColor: '#fff'
    },
    rowText: {
        backgroundColor: '#fff',
        color: 'black',
        fontWeight: 'bold'
    },
    countFooter: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        borderColor: '#D7D7D7',
        backgroundColor: 'darkblue',
        color: 'white',
        fontWeight: 'bold'
    },
    loader: {
        justifyContent: 'center',
        height: 100
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default Movies;
