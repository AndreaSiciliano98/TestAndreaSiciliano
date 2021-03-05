import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        cities: state.cities
    }
}


function RenderCityWeather(props) {
    
    const data = props.city;
    console.log("City: " + data);
    return (
        <View style={styles.cityWeather} >
                    <View>
                        <Text style={styles.cardTitle}>
                            {data.name}
                        </Text>
                        <Text style={styles.cardDate}>
                            {convertDate(data.dt)}
                        </Text>
                        <Text style={styles.cardHour}>
                            {convertTime(data.dt, data.timezone)}
                        </Text>
                    </View>
                    <Image
                        source={{ uri: 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png' }}
                        style={{ width: 100, height: 100, alignItems: "center" }}
                    />
                    <Text style={styles.cardTemp}>
                        {data.main.temp - 273, 15 + "°"}
                    </Text>
                </View >
    );
}



function convertDate(date) {
    var convertedDate = new Date(date * 1000);
    var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var formattedDate = day[convertedDate.getDay()] + " " + convertedDate.getDate() + ", \n" + month[convertedDate.getMonth() - 1];
    return formattedDate;
}

function convertTime(date, timezone) {
    var convertedDate = new Date(date * 1000 + timezone * 1000);
    var formattedTime = convertedDate.getHours() > 13 ? convertedDate.getHours() - 12 + ":" + convertedDate.getMinutes() + " pm" : convertedDate.getHours() + ":" + convertedDate.getMinutes() + " am"
    return formattedTime;
}

function setBgColor(weather) {
    var bgColor;
    switch (weather) {
        case "Thunderstorm":
            bgColor = "#0303fc";
            break;

            case "Drizzle":
                bgColor = "#a3a3a3";
                break;

                case "Rain":
                    bgColor = "#6b6bfa";
                    break;

                    case "Rain":
                    bgColor = "#6b6bfa";
                    break;

                    case "Snow":
                    bgColor = "#f5f5f5";
                    break;

                    case "Clear":
                    bgColor = "#00c3ff";
                    break;

                    case "Clouds":
                    bgColor = "#919191";
                    break;
    
        default:
            break;
    }

    return bgColor;
}

class Home extends Component {

    render() {
        const { navigate } = this.props.navigation;
        console.log(this.props.cities.cities);
        var bgColor = setBgColor(this.props.cities.cities.weather[0].main);
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#f0f0f0" />
                <Text style={styles.text}>Good Morning!</Text>
                <Text style={styles.text, styles.text}>Mario</Text>
                <Icon.Button
                    name="plus-square-o"
                    backgroundColor="none"
                    color="#3b5998"
                >
                    <Text style={styles.text20}>Aggiungi città</Text>
                </Icon.Button>
                
                <TouchableOpacity onPress={() => navigate('CityDetailsComponent', { details: this.props.cities.cities, bgColor: bgColor })} style={{borderRadius: 20, backgroundColor: bgColor}}>
                    <RenderCityWeather {...this.props} city={this.props.cities.cities}  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('CityDetailsComponent', { details: this.props.cities.cities, bgColor: bgColor })} style={{borderRadius: 20, backgroundColor: bgColor}}>
                    <RenderCityWeather {...this.props} city={this.props.cities.cities}  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('CityDetailsComponent', { details: this.props.cities.cities, bgColor: bgColor })} style={{borderRadius: 20, backgroundColor: bgColor}}>
                    <RenderCityWeather {...this.props} city={this.props.cities.cities}  />
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    text: {
        fontSize: 30,
        color: "#3b5998",
        fontWeight: "bold"
    },
    text20: {
        fontSize: 20,
        color: "#3b5998",
        fontWeight: "bold"
    },
    cityWeather: {
        display: "flex",
        flexDirection: "row",
        padding: "10%",
        width: "90%",
        borderRadius: 20,
    },
    cardTitle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 30
    },
    cardDate: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20
    },
    cardHour: {
        color: "white",
        fontWeight: "bold",
        fontSize: 15
    },
    cardTemp: {
        color: "white",
        fontWeight: "bold",
        fontSize: 40
    }
});


export default connect(mapStateToProps)(Home);