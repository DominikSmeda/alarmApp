import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import zdj from './user.png'
import MyButton from './MyButton';
class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={zdj}
                />

                <Text style={styles.text}>{this.props.index}. {this.props.username}</Text>
                <MyButton onClick={
                    this.props.editClick.bind(this,
                        { username: this.props.username, password: this.props.password })}
                    text="Edytuj"></MyButton>
                <MyButton text="Usuń" onClick={this.props.delClick.bind(this, this.props.username)}></MyButton>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
    },
    text: {
        width: 130,
        paddingLeft: 10
    }
})
export default ListItem;
