import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet, Alert, StatusBar
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import {Actions} from "react-native-router-flux";

export default class AgendaScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {}
        };
    }

    render() {
        return (
            <Agenda
                items={this.state.items}
                loadItemsForMonth={this.loadItems.bind(this)}
                selected={this.onDayPress}
                renderItem={this.renderItem.bind(this)}
                renderEmptyDate={this.renderEmptyDate.bind(this)}
                rowHasChanged={this.rowHasChanged.bind(this)}
                monthFormat={'yyyy'}
                button = {this.addButton()}
            />


        );
    }

    goHome() {
        Actions.home()
    }

    addEvent() {
        Actions.addEvent()
    }

    loadItems(day) {
        const {items} = this.state
        fetch('http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/event/').then(function (response) {
            return response.json()
        }).then(function (data) {
            const newItems = {}
            for (var i = 0; i < data.length; i++) {
                var time = data[i]['startTime']
                var header = data[i]['header']
                time = new Date(time)
                var strTime = time.toISOString().split('T')[0]
                if (!items[strTime]) {
                    items[strTime] = [];
                    items[strTime].push({
                        name: header,
                        height: Math.max(50, Math.floor(Math.random() * 150)),
                        id: data[i]['id']
                    });
                }
                else {
                    var dupe = false
                    for (var j = 0; j < items[strTime].length; j++) {
                        if (items[strTime][j]["id"] == data[i]["id"]) {
                            dupe = true
                        }
                    }
                    if (!dupe) {
                        items[strTime].push({
                            name: header,
                            height: Math.max(50, Math.floor(Math.random() * 150)),
                            id: data[i]['id']
                        });
                    }
                }
                for (var k = -15; k < 16; k++) {
                    var newDay = day.timestamp + k * 24 * 60 * 60 * 1000;
                    newDay = new Date(newDay)
                    var strTime = newDay.toISOString().split('T')[0]
                    if (!items[strTime]) {
                        items[strTime] = []
                    }
                }
                const SelectedDay = new Date(day.timestamp);
                for (var k = -15; k < 16; k++) {
                    //const newDay = moment(SelectedDay).add(i, 'day')
                    var newDay = day.timestamp + k * 24 * 60 * 60 * 1000;
                    newDay = new Date(newDay)
                    var strTime = newDay.toISOString().split('T')[0]
                    if (!items[strTime]) {
                        items[strTime] = []
                    }

                }

            }
        });
    }

    renderItem(item) {
        return (
            <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text>
            </View>
        );
    }

    renderEmptyDate(day) {
        return (
            <View style={styles.emptyDate}><Text>Nothing scheduled - Go feed ducks!</Text></View>
        );
    }

    addButton(){
        <ActionButton buttonColor="rgba(231,76,60,1)">
            <ActionButton.Item buttonColor='#9b59b6' title="Add New Task" onPress={this.addEvent}>
                <Icon name="md-create" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#1abc9c' title="Go Home" onPress={this.goHome}>
                <Icon name="md-done-all" style={styles.actionButtonIcon} />
            </ActionButton.Item>
        </ActionButton>
    }
    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'lightblue',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    },
    actionButtonIcon:{
        fontSize: 20,
        height: 22,
        color: 'white',
    }
});