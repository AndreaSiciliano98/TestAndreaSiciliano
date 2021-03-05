import React, { Component } from 'react';
import { View, Text, SafeAreaView, StatusBar, StyleSheet, Image, ScrollView, FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import { render } from 'react-dom';
import { Dimensions } from 'react-native';
import { fetchDaysWeathers } from "../redux/ActionCreators";
import { openWeatherUrl, openWeatherUrlAppId } from '../shared/openWeatherUrl';


const mapStateToProps = state => {
    return {
        cities: state.cities
    }
}

function convertDate(date) {
    var convertedDate = new Date(date * 1000);
    var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var formattedDate = day[convertedDate.getDay()] + " " + convertedDate.getDate() + ", " + month[convertedDate.getMonth() - 1];
    return formattedDate;
}
function RenderNextDays(props) {
    var data = props.details;
    return (
        <View style={{
            padding: 10,
            marginLeft: 10,
            borderRadius: 20, flexDirection: "column", justifyContent: "space-around", alignItems: "center", backgroundColor: bgColor, borderColor: "black", borderWidth: 1
        }}>
            <Text style={[styles.text, { fontWeight: "bold", fontSize: 30, padding: 5 }]}>
                Saturday
            </Text>
            <Text style={[styles.text, { fontWeight: "bold", fontSize: 40 }]}>
                18°
            </Text>
            <Image
                source={{ uri: 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png' }}
                style={{ width: 140, height: 140, alignItems: "center" }}
            />
        </View>
    )

}

function HourlyTemp(props) {
    for(var i=0; i<5; i++) {
        return (
        <View style={{flex: 1, flexDirection: "column", height: Dimensions.get('window').height/5, justifyContent: "center", minWidth: Dimensions.get('window').width/5}}>
                    <Text style={[styles.text, {fontSize: 20, textAlign: "left"}]}>Now</Text>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: 'center'}}>
                        
                    <View style={{ borderColor: "white", borderWidth: 15, borderRadius: 100}}>

                    </View>
                    <View style={{ borderColor: "white", borderWidth: 4, height: 4, width: "100%"}}>

                    </View>

                </View>
                <Text style={[styles.text, {fontSize: 20, textAlign: "left"}]}>{props.item}</Text>
                </View>
    )
    }
    
}

class CityDetailsComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            details: this.props.route.params.details,
            bgColor: this.props.route.params.bgColor,
            tempHours: ["3pm", "4pm", "5pm", "6pm", "7pm", "7pm"],
        }
    }


    render() {
        console.log("WEATHERS: " + this.state.weather.hourly);
        const { navigate } = this.props.navigation;
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: this.state.bgColor }]}>
                <StatusBar backgroundColor={this.state.bgColor} />
                <View style={styles.header}>
                    <Icon.Button
                        name="arrow-left"
                        backgroundColor={this.state.bgColor}
                        size={35}
                        color="white"
                        onPress={() => navigate('Home')}
                    />
                    <View>
                        <Text style={[styles.text, { fontWeight: "bold", fontSize: 30 }]}>{this.state.details.name}</Text>
                        <Text style={[styles.text, { fontWeight: "bold", fontSize: 20 }]}>{convertDate(this.state.details.dt)}</Text>
                        <Text style={[styles.text, { fontSize: 20 }]}>{this.state.details.weather[0].main}</Text>

                    </View>
                    <Icon.Button
                        name="plus-square-o"
                        backgroundColor="none"
                        color="white"
                        size={35}
                    />
                </View>
                <View style={[styles.header, { width: "70%", }]}>
                    <Image
                        source={{ uri: 'http://openweathermap.org/img/w/' + this.state.details.weather[0].icon + '.png' }}
                        style={{ width: 150, height: 150, alignItems: "center", }}
                    />
                    <Text style={[styles.text, { fontSize: 80, }]}>{this.state.details.main.temp - 273, 15 + "°"}</Text>
                </View>
                <View style={[styles.header]}>
            
                    <FlatList
                    horizontal
                    style={{
                        flexGrow: 1, paddingLeft: 20, paddingRight: 20,}}
                    data={this.state.tempHours}
                    renderItem={HourlyTemp}
                    keyExtractor={item => item}
                />
                </View>
                
                <View style={styles.header}>
                    <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }}>
                        <RenderNextDays details={this.state.details} />
                        <RenderNextDays details={this.state.details} />
                        <RenderNextDays details={this.state.details} />
                        <RenderNextDays details={this.state.details} />
                        <RenderNextDays details={this.state.details} />
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    text: {
        color: "white",
        textAlign: "center"
    },
    header: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center"
    }
})
export default connect(mapStateToProps)(CityDetailsComponent);