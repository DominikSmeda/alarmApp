import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import MyButton from './MyButton';
import ListItem from './ListItem'
import { ip, port } from './Settings.json'


class Users extends Component {
    static navigationOptions = {
        // header: null,
        title: "admin page",
        headerStyle: {
            backgroundColor: "green",
        },
        headerTitleStyle: {
            color: "white"
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            usersdata: []
        };

    }

    componentDidMount() {

        this.props.navigation.addListener('willFocus', this.getUsers)
    }

    getUsers = () => {


        fetch('http://' + ip + ":" + port + '/users', {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
            },


        }).then(fromServer => {

            fromServer.json().then(json => {

                this.setState({ usersdata: json.users })

            })


        })
    }
    delUser = (username) => {

        let data = {
            username
        }
        fetch('http://' + ip + ":" + port + '/users', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)

        }).then(fromServer => {
            this.getUsers()
        })
    }
    goToEditUser = (values) => {
        this.props.navigation.navigate("EditUser", values)
    }

    render() {
        console.log(this.state)
        return (
            <View>
                <MyButton bgC="white" text="Back To login page" onClick={() => {
                    this.props.navigation.navigate("Main")
                }}></MyButton>

                <FlatList

                    keyExtractor={(item, index) => item + index}

                    data={
                        this.state.usersdata
                    }

                    renderItem={({ item, index }) => <ListItem delClick={this.delUser} editClick={this.goToEditUser} index={index} username={item.username} password={item.password} />}

                />

            </View>
        );
    }
}

export default Users;
