import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Animated, TouchableOpacity, Switch } from 'react-native';
import { TouchableNativeFeedback } from 'react-native'


import delIco from './delete.png'
import arrdownIco from './arrow-down.png'

import Database from './Database';

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: new Animated.Value(0), // początkowa wartość wysokości itema
            expanded: false, // zwinięty
            selected: [false, true, false, false, false, false, false]
        };

        this.days = ['Poniedziałek', 'Wtorek', 'Środe', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
        this.shortDays = ['PN', 'WT', 'ŚR', 'CZ', 'PT', 'SB', 'ND'];


        this.toValue = 0
    }

    componentDidMount = async () => {

        let days;

        try {
            days = await JSON.parse(this.props.days)
        }
        catch{
            days = []
        }
        this.setState({ selected: days });
    }


    toggle() {

        if (!this.state.expanded) this.toValue = 50
        else this.toValue = 0

        Animated.spring(this.state.height, {
            toValue: this.toValue,
        }).start();

        this.setState({ expanded: !this.state.expanded })

    }

    addDay = (nr) => {

        let newSelected = this.state.selected;
        newSelected[nr] = !newSelected[nr]


        this.setState({ selected: newSelected })

        Database.updateDays(this.props.id, JSON.stringify(this.state.selected));
    }

    render() {


        let days = "";
        for (let i = 0; i < this.days.length; i++) {

            if (this.state.selected[i] == true) {
                days += this.days[i] + ", ";


            }
        }
        days = days.substring(0, days.length - 2)


        let shortDays = this.shortDays.map((el, i) => {

            return (<Day addDay={this.addDay} nr={i} key={i} text={el} selected={this.state.selected[i]}></Day>)
        });



        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.time}>{this.props.time}</Text>
                    <Switch />
                </View>
                <View style={styles.row}>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('deeppink', true)}
                        onPress={() => this.props.removeAlarm(this.props.id)}

                    >
                        <View>
                            <Image source={delIco} style={{ width: 40, height: 40 }} />
                        </View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('deeppink', true)}
                        onPress={() => this.toggle()}

                    >
                        <View>
                            <Image source={arrdownIco} style={{ width: 40, height: 40 }} />
                        </View>
                    </TouchableNativeFeedback>
                </View>

                {!this.state.expanded ?
                    <View style={styles.row}>
                        <Text>{days}</Text>
                    </View>
                    :
                    null
                }

                <Animated.View style={{
                    height: this.state.height, // animowany styl, tutaj wysokość View
                }} >
                    {

                        <View style={[styles.row, {}]}>
                            {this.state.expanded ?
                                <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flex: 1 }}>{shortDays}</View>
                                :
                                null
                            }
                        </View>
                    }
                </Animated.View>


            </View >
        );
    }
}


class Day extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }

    render() {
        return (
            <TouchableOpacity onPress={() => { this.props.addDay(this.props.nr) }}>
                <View style={[styles.day, this.props.selected ? styles.selected : {}]}>
                    <Text>{this.props.text}</Text>
                </View>
            </TouchableOpacity>
        )
    }

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        padding: 10,
        borderBottomWidth: 2,
        borderColor: 'purple'
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    time: {
        fontSize: 40
    },

    day: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 34,
        height: 34
    },

    selected: {
        backgroundColor: 'purple',
        borderRadius: 17,
    }
});

export default ListItem;
