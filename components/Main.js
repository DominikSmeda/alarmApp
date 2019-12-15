import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import ListItems from './ListItems';
import MyButton from './MyButton';

import Database from './Database';


class Main extends Component {

    static navigationOptions = {
        title: "Lista budzików",
        headerStyle: {
            backgroundColor: "purple",
        },
        headerTitleStyle: {
            color: "#ffffff"
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }


    componentDidMount() {

        Database.createTable();
        this.props.navigation.addListener('willFocus', () => {
            this.getAlarms();
        });

    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{ width: "100%" }}>
                    <ListItems data={this.state.data} removeAlarm={this.removeAlarm} />
                </ScrollView >

                <MyButton style={styles.circleButton} textStyle={styles.circleButtonText} text="+" onClick={this.addAlarm} />
            </View>
        );
    }

    addAlarm = () => {
        let date = new Date()
        console.log(date.getUTCHours() + 1, " : ", date.getUTCMinutes() + 1);
        let time = date.getUTCHours() + 1 + ":" + (date.getUTCMinutes() + 1)

        Database.add(time, "");
        this.getAlarms();

    }

    removeAlarm = (id) => {

        this.setState({
            data: this.state.data.filter((el) => {
                if (el.id != id)
                    return true;
                else
                    return false
            })
        })

        Database.remove(id);
    }

    getAlarms() {

        Database.getAll()
            .then((all) => {
                console.log(all);

                this.setState({ data: all })

            }).catch(err => {
                console.log(err);

            })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },

    circleButton: {
        backgroundColor: 'purple',
        width: 70,
        height: 70,
        borderRadius: 70 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10

    },

    circleButtonText: {
        color: 'white',
        fontSize: 50,
    }


});


export default Main;
