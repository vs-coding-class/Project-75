import * as React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

import db from '../config';
import firebase from 'firebase';

export default class ReadStoryScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            searchText: '',
            allStories: [],
            selectStories: [],
        }
    }

    componentDidMount() {
        this.getData();
        //this.filterData(this.state.searchText);
    }

    getData() {
        this.setState({
            allStories: [],
        });

        db.collection("stories")
            .onSnapshot((snapshot) => {
                snapshot.forEach((doc) => {
                    var data = doc.data();

                    this.state.allStories.push(data);
                });
            });

        console.log(this.state.allStories);
    }

    filterData(text) {
        const newData = this.state.allStories.filter((item) => {
            const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            selectStories: newData,
            searchText: text,
        });
    }

    render() {
        return (
            <View>
                <View>
                    <SearchBar
                        placeholder={'Type here...'}
                        onChangeText={(text) => {
                            this.filterData(text);
                        }}
                        value={this.state.searchText} />
                </View>
                <View>
                    <FlatList
                        data={this.state.selectStories}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <Text>Title: {item.title}</Text>
                                <Text>Author: {item.author}</Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        bottomDivider
                    />
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        height: 80,
        width: '100%',
        borderWidth: 2,
        borderColor: 'pink',
        justifyContent: 'center',
        alignSelf: 'center',
    },
});