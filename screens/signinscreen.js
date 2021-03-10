import * as React from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import db from '../config';
import firebase from 'firebase';

export default class SignInScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
        }
    }

    userLogin = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.props.navigation.navigate('WriteStoryScreen');
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage);
            });
    }

    render() {
        return (
            <View style={{ backgroundColor: 'orange' }}>
                <View>
                    <TextInput
                        style={styles.textInput}
                        placeholder={'Please enter your email...'}
                        keyboardType={'email-address'}
                        onChangeText={(text) => {
                            this.setState({ email: text });
                        }}
                        value={this.state.email}
                    />

                    <TextInput
                        style={styles.textInput}
                        placeholder={'Please enter your password...'}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({ password: text });
                        }}
                        value={this.state.password}
                    />
                </View>

                <View>
                    <TouchableOpacity
                        style={styles.login}
                        onPress={() => { this.userLogin(this.state.email, this.state.password); }}>
                        <Text style={styles.text}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        width: '80%',
        height: 40,
        borderWidth: 2,
        borderColor: '#0A1045',
        fontSize: 15,
        textAlign: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 50,
    },
    text: {
        fontSize: 15,
        color: '#F13030',
    },
    login: {
        width: '20%',
        height: '100',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        alignSelf:'center',
        borderRadius: 100,
        padding: 50,
        backgroundColor: '#1E555C',
    },
});