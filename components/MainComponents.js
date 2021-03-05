import React, { Component } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from "react-redux";
import Home from './HomeComponent';
import CityDetailsComponent from './CityDetailsComponent';
import { fetchCities } from "../redux/ActionCreators";

const mapStateToProps = state => {
    return {
        cities: state.cities
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCities: () => dispatch(fetchCities("London"))
})



const Stack = createStackNavigator();

class Main extends Component {

    componentDidMount() {
        this.props.fetchCities();
    }

    render() {

        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" screenOptions={{
    headerShown: false
  }}>
                    <Stack.Screen name="Home">
                    {props => <Home {...props} />}
                    </Stack.Screen>
                    <Stack.Screen name="CityDetailsComponent" component={CityDetailsComponent} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);