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
    BackHandler,
    Image,
    Dimensions,
    RefreshControl
} from 'react-native';

import ListView from 'deprecated-react-native-listview';

class SearchResults extends Component {
    constructor(props) {
        super(props);

        BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.props.navigator) {
                this.props.navigator.pop();
            }
            return true;
        });

        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            dataSource: ds.cloneWithRows([])
        };

        if (props) {
            this.state = {
                dataSource: ds.cloneWithRows([]),
                searchQueryHttp: props.navigation.state.params.data.searchQuery,
                searchType: props.navigation.state.params.data.searchType,
                showProgress: true,
                resultsCount: 0,
                recordsCount: 15,
                positionY: 0,
                searchQuery: '',
                refreshing: false
            };
        }

        this.getItems();
    }

    getItems() {
        this.setState({
            serverError: false,
            resultsCount: 0,
            recordsCount: 15,
            positionY: 0,
            searchQuery: ''
        });

        let webUrl;
        if (this.state.searchType === 'Search by phone') {
            webUrl = 'api/items/findByPhone/';
        } else {
            webUrl = 'api/items/findByName/';
        }

        fetch(appConfig.url + webUrl + this.state.searchQueryHttp, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': appConfig.access_token
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.sort(this.sort).slice(0, 15)),
                    resultsCount: responseData.length,
                    responseData: responseData.sort(this.sort),
                    filteredItems: responseData.sort(this.sort),
                    refreshing: false
                });

            })
            .catch((error) => {
                this.setState({
                    serverError: true
                });
            })
            .finally(() => {
                this.setState({
                    showProgress: false
                });
            });
    }

    sort(a, b) {
        let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    }

    showDetails(rowData) {
        this.props.navigation.navigate('PhoneDetails', {data: rowData});
    }

    renderRow(rowData) {
        return (
            <TouchableHighlight
                onPress={() => this.showDetails(rowData)}
                underlayColor='#ddd'>
                <View style={styles.row}>
                    <Text style={styles.rowText}>
                        {rowData.name} - {rowData.phone}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    refreshData(event) {
        if (this.state.showProgress === true) {
            return;
        }

        if (event.nativeEvent.contentOffset.y <= -150) {
            this.setState({
                showProgress: true,
                resultsCount: 0,
                recordsCount: 15,
                positionY: 0,
                searchQuery: ''
            });

            setTimeout(() => {
                this.findItems();
            }, 300);
        }

        if (this.state.filteredItems === undefined) {
            return;
        }

        let items, positionY, recordsCount;
        recordsCount = this.state.recordsCount;
        positionY = this.state.positionY;
        items = this.state.filteredItems.slice(0, recordsCount);

        if (event.nativeEvent.contentOffset.y >= positionY - 10) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items),
                recordsCount: recordsCount + 10,
                positionY: positionY + 500
            });
        }
    }

    onChangeText(text) {
        if (this.state.dataSource === undefined) {
            return;
        }

        let arr = [].concat(this.state.responseData);
        let items = arr.filter((el) => el.phone.toLowerCase().indexOf(text.toLowerCase()) !== -1);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items),
            resultsCount: items.length,
            filteredItems: items,
            searchQuery: text
        });
    }

    refreshDataAndroid() {
        this.setState({
            showProgress: true,
            resultsCount: 0
        });

        this.getItems();
    }

    goBack() {
        this.props.navigation.goBack();
    }

    clearSearchQuery() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.state.responseData.slice(0, 15)),
            resultsCount: this.state.responseData.length,
            filteredItems: this.state.responseData,
            positionY: 0,
            recordsCount: 15,
            searchQuery: ''
        });
    }

    render() {
        let errorCtrl, loader, image;

        if (this.state.serverError) {
            errorCtrl = <Text style={styles.error}>
                Something went wrong.
            </Text>;
        }

        if (this.state.showProgress) {
            loader = <View style={styles.loader}>
                <ActivityIndicator
                    size="large"
                    color="darkblue"
                    animating={true}
                />
            </View>;
        }

        if (this.state.searchQuery.length > 0) {
            image = <Image
                source={require('../../../img/cancel.png')}
                style={{
                    height: 20,
                    width: 20,
                    marginTop: 10
                }}
            />;
        }

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
                                    {this.state.searchQueryHttp}
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

                <View style={styles.iconForm}>
                    <View>
                        <TextInput
                            underlineColorAndroid='rgba(0,0,0,0)'
                            onChangeText={this.onChangeText.bind(this)}
                            style={styles.searchLarge}
                            value={this.state.searchQuery}
                            placeholder="Search here">
                        </TextInput>
                    </View>
                    <View style={styles.searchSmall}>
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

                <ScrollView
                    onScroll={this.refreshData.bind(this)}
                    scrollEventThrottle={16}
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
                        Records: {this.state.resultsCount.toString()}
                    </Text>
                </View>
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
    iconForm: {
        flexDirection: 'row',
        borderColor: 'darkblue',
        borderWidth: 3
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'darkblue',
        borderWidth: 0,
        borderColor: 'whitesmoke'
    },
    searchLarge: {
        height: 45,
        padding: 5,
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 0,
        width: Dimensions.get('window').width * .90
    },
    searchSmall: {
        height: 45,
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'white',
        marginLeft: -5,
        paddingLeft: 5,
        width: Dimensions.get('window').width * .10
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
        marginRight: 60,
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

export default SearchResults;
