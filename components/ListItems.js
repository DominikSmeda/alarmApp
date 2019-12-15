import React, { Component } from 'react';
import { View, Text } from 'react-native';

import ListItem from './ListItem';

class ListItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let listItems = this.props.data.map((el, i) => {

            return (<ListItem key={el.id} id={el.id} time={el.time} days={el.days} removeAlarm={this.props.removeAlarm} ></ListItem>)
        })

        return (
            <View style={{ flex: 1 }}>
                {listItems}
            </View>
        );
    }
}

export default ListItems;
