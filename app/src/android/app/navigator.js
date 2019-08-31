'use strict';

import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Navigator,
	TouchableHighlight,
	TouchableOpacity
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import Audit from './audit';
import AuditDetails from './auditDetails';

class SampleApp extends Component {
	constructor(props) {
		super(props);	
	}
	
	render() {
		return (
			<ScrollableTabView>
				<AuditTab tabLabel="Audit" />
				<PageOne tabLabel="PageOne" />
 
			</ScrollableTabView>
		);
	}
}

class AuditTab extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'Audit', index: 0},
			{title: 'Audit Details', index: 1}
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Audit routes={this.routes} navigator={navigator} />
					break;			
			case 1: return <AuditDetails data={route.data} routes={this.routes} navigator={navigator} />
					break
 		}
 	}	
	
	render() {
		return (
	  		<Navigator
			initialRoute={this.routes[0]}
			initialRouteStack={this.routes}
		    renderScene={this.renderScene.bind(this)}

		    navigationBar1={
				<Navigator.NavigationBar
					routeMapper={{
						LeftButton: (route, navigator, index, navState) =>
							{ return null;(<Text>Cancel</Text>); },
						RightButton: (route, navigator, index, navState) =>
							{ return null; (<Text>Done</Text>); },
						Title: (route, navigator, index, navState) =>
							{ return (<Text>{route.title}</Text>); },
					}}
					style={{backgroundColor: 'white'}}
				/>
			}
			
			style={{padding: 0}}
		  
			configureScene={(route, routeStack) =>
				Navigator.SceneConfigs.PushFromRight}
		/>
		)
	}
}

class PageOne extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'First Scene', index: 0},
			{title: 'Second Scene', index: 1},
			{title: 'Three Scene', index: 2},
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <PageFirst routes={this.routes} navigator={navigator} />
					break;			
			case 1: return <PageTwo routes={this.routes} navigator={navigator} />
					break;			
			case 2: return <PageThree routes={this.routes} navigator={navigator} />
					break;
 		}
 	}	
	
	render() {
		return (
	  		<Navigator
			initialRoute={this.routes[0]}
			initialRouteStack={this.routes}
		    renderScene={this.renderScene.bind(this)}

		    navigationBar={
				<Navigator.NavigationBar
				routeMapper={{
					LeftButton: (route, navigator, index, navState) =>
						{ return null;(<Text>Cancel</Text>); },
					RightButton: (route, navigator, index, navState) =>
						{ return null; (<Text>Done</Text>); },
					Title: (route, navigator, index, navState) =>
						{ return (<Text>{route.title}</Text>); },
				}}
				style={{backgroundColor: 'red'}}
				/>
							}
			
			style={{padding: 0}}
		  
			configureScene={(route, routeStack) =>
				Navigator.SceneConfigs.PushFromRight}
		/>
		)
	}
}

class PageFirst extends Component {
	constructor(props) {
		super(props);
	}
	
	_handlePress() {
		this.props.navigator.push(this.props.routes[1]);
	}		
	
	render() {
		return (
			<View style={[styles.container, {backgroundColor: 'green'}]}>
				<Text style={styles.welcome}>Greetings!!!</Text>
				<TouchableOpacity onPress={this._handlePress.bind(this)}>
					<View style={{paddingVertical: 20, paddingHorizontal: 20, backgroundColor: 'black'}}>
						<Text style={styles.welcome}>Go to page two</Text>
					</View>
				</TouchableOpacity>	
			</View>
		)
	}
}

class PageTwo extends Component {
	constructor(props) {
		super(props);	
	}
		
	_handlePress() {
		//this.props.navigator.pop();
		this.props.navigator.push(this.props.routes[2]);
	}
		
  render() {
    return (
      <View style={[styles.container, {backgroundColor: 'purple'}]}>
        <Text style={styles.welcome}>This is page two!</Text>
        <TouchableOpacity onPress={this._handlePress.bind(this)}>
          <View style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'black'}}>
            <Text style={styles.welcome}>Go to page three</Text>
          </View>
        </TouchableOpacity>
       </View>
    )
  }
}

class PageThree extends Component {
	constructor(props) {
		super(props);	
	}
		
	_handlePress() {
		this.props.navigator.popToTop(0);
		//this.props.navigator.push(this.props.routes[0]);
	}
		
  render() {
    return (
      <View style={[styles.container, {backgroundColor: 'blue'}]}>
        <Text style={styles.welcome}>This is page three!</Text>
        <TouchableOpacity onPress={this._handlePress.bind(this)}>
          <View style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'black'}}>
            <Text style={styles.welcome}>Go back</Text>
          </View>
        </TouchableOpacity>
       </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
});

module.exports = SampleApp;
