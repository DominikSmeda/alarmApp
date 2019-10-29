import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import zdj from './user.png'
class EditUser extends Component {
    static navigationOptions = {
        // header: null,
        title: "edit page",
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
        };

    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{ width: 100, height: 100 }}
                    source={zdj}
                />

                <Text>{this.props.navigation.state.params.username}</Text>
                <Text>{this.props.navigation.state.params.password}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'center',
    }
})

export default EditUser;
