import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MyButton from './MyButton';
import * as Permissions from "expo-permissions";

class Main extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

    }



    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Sqlite App</Text>
                    <Text style={styles.descript}>manage sqlite</Text>
                    <Text style={styles.descript}>use animation</Text>
                    <Text style={styles.descript}>use ring</Text>
                </View>
                <View style={styles.content}>
                    <MyButton text="Start" onClick={
                        () => {
                            this.props.navigation.navigate("Main")
                        }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "purple"
    },
    title: {
        color: "white",
        fontSize: 30
    },
    descript: {
        color: "white"
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    }
})

export default Main;
