import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { TextInput } from 'react-native';
import MyButton from './MyButton'
import { ip, port } from './Settings.json'
class Main extends Component {
    static navigationOptions = {
        header: null,

    }
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };
    }
    setUser = (text) => {
        this.setState({
            username: text
        })
    }
    setPasswd = (text) => {
        this.setState({
            password: text
        })
    }
    sendReg = (e) => {
        if (this.state.username == "" || this.state.password == "") {
            alert('Type username and password')
            return;
        }

        let data = {
            username: this.state.username,
            password: this.state.password

        }

        fetch('http://' + ip + ":" + port + '/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),

        }).then(fromServer => {
            fromServer.json().then(json => {
                if (json.status == "added") {
                    this.props.navigation.navigate("Users")

                }
                else {
                    alert("user exists")
                }
            })


        })
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.main} behavior="padding" enabled>

                <View style={styles.header}>
                    <Text style={styles.Htext}> Register Node App </Text>

                </View>
                <View style={styles.data}>
                    <View>
                        <Text> username </Text>
                        <TextInput value={this.state.username} onChangeText={this.setUser} style={styles.inputs}></TextInput>
                    </View>
                    <View >
                        <Text> password </Text>
                        <TextInput value={this.state.password} onChangeText={this.setPasswd} style={styles.inputs}></TextInput>
                    </View>
                    <MyButton bgC='white' text="register" onClick={this.sendReg}></MyButton>
                </View>

            </KeyboardAvoidingView>
        );
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: 'green',
        flex: 1,
        justifyContent: "center",
        flexDirection: "row",


    },
    main: {

        flex: 1
    },
    data: {
        flex: 1,
        padding: 5,
    },
    Htext: {
        color: 'white',
        fontSize: 40,
        alignSelf: "center",
        textAlign: "center"

    },
    inputs: {
        borderBottomWidth: 1,
        borderColor: "grey",
        color: 'green',
    }
})
export default Main;



